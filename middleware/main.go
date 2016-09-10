package main

import (
	"fmt"
	"log"
	"runtime"
	"time"

	"upper.io/db.v2/lib/sqlbuilder"
	"upper.io/db.v2/mysql"

	"github.com/gin-gonic/gin"
	"github.com/itsjamie/gin-cors"
)

var (
	// "DBSession..."
	DBSession sqlbuilder.Database

	// DBSession Settings...
	settings = mysql.ConnectionURL{
		Host:     "localhost",
		Database: "payment_reminder",
		User:     "root",
		Password: "",
	}
)

func main() {
	sess, err := mysql.Open(settings)
	if err != nil {
		log.Fatalf("db.Open error: %q", err)
	}

	defer sess.Close()
	DBSession = sess

	ConfigRuntime()
	StartWorkers()
	StartServer()
}

// "ConfigRuntime..."
func ConfigRuntime() {
	numCPU := runtime.NumCPU() / 2
	runtime.GOMAXPROCS(numCPU)
	fmt.Printf("Running with %d CPUs\n", numCPU)
}

// "StartServer..."
func StartServer() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.New()
	router.Use(rateLimit, gin.Recovery())
	router.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     true,
		ValidateHeaders: false,
	}))
	router.GET("/tasks", GetTasks)
	router.GET("/tasks/:id", GetTask)
	router.POST("/tasks", PostTask)
	router.POST("/tasks/:id/paid", PostPaid)
	router.POST("/tasks/:id/checkin/:tid", PostCheckin)

	router.Run(":5000")
}

// "StartWorkers..."
func StartWorkers() {
	go statsWorker()
}
