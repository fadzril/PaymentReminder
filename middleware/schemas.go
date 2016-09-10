package main

import "time"

// Session Schema
type Session struct {
	ID      uint64    `db:"id" json:"id"`
	Date    time.Time `db:"date" json:"date"`
	Price   int       `db:"price" json:"price"`
	TaskID  int64     `db:"task_id" json:"taskid"`
	Checkin int       `db:"checkin" json:"checkin"`
}

// Tasks Schema
type Tasks struct {
	ID          uint64    `db:"id" json:"id"`
	Description string    `db:"description" json:"description"`
	Label       string    `db:"label" json:"label"`
	Amount      int       `db:"amount" json:"amount"`
	Paid        int       `db:"paid" json:"paid"`
	Sessions    []Session `db:", inline" json:"sessions"`
}

// Person Schema
type Person struct {
	ID      int64  `db:"id, omitempty"`
	Name    string `db:"name"`
	Contact string `db:"contact"`
}
