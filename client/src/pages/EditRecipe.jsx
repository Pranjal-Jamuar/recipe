import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { setRandomFallback } from "bcryptjs"

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    category: "",
    photoUrl: "",
    cookingTime: "",
  })
  const { id } = useParams()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    handleInputChange("ingredients", newIngredients)
    const lastIngredient = formData.ingredients[formData.ingredients.length - 1]
    if (error && lastIngredient.trim() !== "") setError("")
  }

  const addIngredient = () => {
    const lastIngredient = formData.ingredients[formData.ingredients.length - 1]
    if (lastIngredient.trim() !== "") {
      setError("")
      handleInputChange("ingredients", [...formData.ingredients, ""])
    } else
      setError("Please fill in the last ingredient before adding a new one!")
  }

  const removeIngredient = index => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index)
      handleInputChange("ingredients", newIngredients)
      const lastIngredient =
        formData.ingredients[formData.ingredients.length - 1]
      if (error && lastIngredient.trim() !== "") setError("")
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setLoading(true)
  }

  return <div>EditRecipe</div>
}

export default EditRecipe
