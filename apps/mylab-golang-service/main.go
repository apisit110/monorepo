package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	Controller "mylab-golang-service/libs/controller"
	"mylab-golang-service/libs/utils/helper"
)

func main() {
	fmt.Println("1: hello, world!")
	fmt.Println("2: hello, world!")

	helper.Init()

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/", Controller.GetProduct)
	r.POST("/add-product", Controller.AddProduct)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
