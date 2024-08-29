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

	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/", Controller.GetProduct)
	router.POST("/add-product", Controller.AddProduct)
	router.Run(":8081") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
