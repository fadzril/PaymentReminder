package main

import (
	"fmt"
	"log"

	db "upper.io/db.v2"
	"upper.io/db.v2/lib/sqlbuilder"

	"github.com/gin-gonic/gin"
)

func rateLimit(c *gin.Context) {

	ip := c.ClientIP()
	value := int(ips.Add(ip, 1))
	if value%50 == 0 {
		fmt.Printf("ip: %s, count: %d\n", ip, value)
	}
	if value >= 500 {
		if value%500 == 0 {
			fmt.Println("ip blocked")
		}
		c.Abort()
		c.String(503, "you were automatically banned :)")
	}
}

// "GetTasks ..."
func GetTasks(c *gin.Context) {
	var result db.Result
	result = DBSession.Collection("tasks").Find()

	var tasks []Tasks
	err := result.All(&tasks)
	if err != nil {
		msg := fmt.Sprintf("Error getting result: %q", err)
		c.JSON(500, gin.H{"result": false, "msg": msg})

		log.Fatalf("res.All(): %q\n", err)
	} else {
		var response []Tasks

		for _, task := range tasks {
			var sessions []Session
			err = DBSession.Collection("session").Find("task_id", task.ID).All(&sessions)
			task.Sessions = sessions

			if err != nil {
				log.Fatalf("Session.Find() Error: %q\n", err)
			}

			response = append(response, task)
		}

		c.JSON(200, gin.H{"result": true, "data": response})
	}
}

// "GetTask ..."
func GetTask(c *gin.Context) {
	id := c.Param("id")

	var task Tasks
	if err := DBSession.Collection("tasks").Find("id", id).One(&task); err != nil {
		log.Printf("Error Getting Task %v", id)
		c.JSON(500, gin.H{"result": false, "msg": "Cannot find task"})
	} else {
		var sessions []Session
		err = DBSession.Collection("session").Find("task_id", task.ID).All(&sessions)

		if err != nil {
			log.Fatalf("Session.Find() Error: %q\n", err)
		}

		task.Sessions = sessions
		c.JSON(200, gin.H{"result": true, "data": task})
	}
}

// "PostTask ..."
func PostTask(c *gin.Context) {
	var task Tasks
	var id int64
	err := c.BindJSON(&task)
	if err != nil {
		log.Printf("Error Convert BindJSON :%q\n", err)
		c.JSON(500, gin.H{"result": false, "msg": "Error Convert BindJSON"})
	}

	errtx := DBSession.Tx(func(tx sqlbuilder.Tx) error {
		txid, errtx := tx.Collection("tasks").Insert(&task)
		if errtx != nil {
			return errtx
		}

		for _, session := range task.Sessions {
			id = txid.(int64)

			tx.Collection("session").InsertReturning(&Session{
				Price:   (task.Amount / len(task.Sessions)),
				Date:    session.Date,
				TaskID:  id,
				Checkin: 0,
			})
			if err != nil {
				log.Printf("Session Insert(): %q\n", err)
			}
		}

		return nil
	})

	if errtx != nil {
		log.Printf("Transaction Failed: %q\n", errtx)
		msg := fmt.Sprintf("Transaction Error: %q", errtx)

		c.JSON(500, gin.H{"result": false, "msg": msg})
	} else {
		var sessions []Session
		err = DBSession.Collection("session").Find("task_id", id).OrderBy("id").All(&sessions)
		task.Sessions = sessions

		if err != nil {
			log.Printf("Error Find(): %q\n", err)
		}

		c.JSON(200, gin.H{"result": true, "msg": "Successfully add new task."})
	}
}

// "PostCheckin ..."
func PostCheckin(c *gin.Context) {
	tid := c.Param("tid")
	status := c.Query("status")

	/*************
			var res db.Result
			var session Session
				if err := DBSession.Collection("session").Find("id", tid).One(&session); err != nil {
					msg := fmt.Sprintf("Error getting result. %q", err)
					c.JSON(500, gin.H{"result": false, "msg": msg})
				} else {
					c.JSON(200, gin.H{"result": true, "data": session})
				}

			res = DBSession.Collection("session").Find("id", tid)
	    ************/

	query := DBSession.Update("session").Set("checkin", status).Where("id = ?", tid)
	_, err := query.Exec()

	if err != nil {
		msg := fmt.Sprintf("Error getting result. %q", err)
		c.JSON(500, gin.H{"result": false, "msg": msg})
	} else {
		c.JSON(200, gin.H{"result": true})
	}
}

// "PostPaid...."
func PostPaid(c *gin.Context) {
	tid := c.Param("id")

	query := DBSession.Update("tasks").Set("paid", 1).Where("id = ?", tid)
	_, err := query.Exec()

	if err != nil {
		msg := fmt.Sprintf("Error getting result. %q", err)
		c.JSON(500, gin.H{"result": false, "msg": msg})
	} else {
		c.JSON(200, gin.H{"result": true, "msg": "Successfully add payment."})
	}
}
