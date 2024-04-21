package product

import (
	"fmt"
	"net/http"

	"mylab-golang-service/libs/model"
	"mylab-golang-service/libs/utils/helper"

	"github.com/gin-gonic/gin"
)

// Model
type ProductBody struct {
	Name string `json:"name" binding:"required"`
	Code string `json:"code" binding:"required"`
}

func GetProduct(c *gin.Context) {
	var product model.ProductModel
	helper.Db.First(&product, 1)
	// tx := helper.Db.First(&product)
	// fmt.Println("tx: ", tx)

	c.JSON(http.StatusOK, gin.H{"message": product})
}

func AddProduct(c *gin.Context) {
	var json ProductBody
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Read
	var productExist model.ProductModel
	// helper.Db.Where("name = ?", json.Name).First(&productExist)
	// helper.Db.First(&productExist, 1)
	helper.Db.First(&productExist, "name = ?", json.Name)

	fmt.Printf("productExist: %v", productExist)

	if productExist.ID > 0 {
		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "User Exists"})
		return
	}

	// Create
	helper.Db.Create(&model.ProductModel{Name: json.Name, Code: json.Code})
}
