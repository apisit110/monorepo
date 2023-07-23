package helper

import (
	"mylab-golang-service/libs/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Db *gorm.DB

var err error

func Init() {
	dsn := "root:my-secret-pw@tcp(127.0.0.1:3306)/mylab?charset=utf8mb4&parseTime=True&loc=Local"
	Db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	Db.AutoMigrate(&model.ProductModel{})
}
