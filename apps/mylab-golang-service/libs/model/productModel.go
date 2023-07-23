package model

import (
	"gorm.io/gorm"
)

type ProductModel struct {
	gorm.Model
	// Id int
	// CreatedAt string
	// UpdatedAt string
	// DeletedAt string
	Name string
	Code string
}
