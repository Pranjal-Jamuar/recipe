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

    try {
      await axios.put(`api/recipes/${id}`, {
        title: formData.title,
        ingredients: formData.ingredients.filter(i => i.trim() !== ""),
        instructions: formData.instructions,
        category: formData.category,
        photoUrl: formData.photoUrl,
        cookingTime: formData.cookingTime
          ? Number(formData.cookingTime)
          : undefined,
      })
      navigate("/")
    } catch (error) {
      setError("Failed to add recipe!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`api/recipes/${id}`)
      setFormData({
        title: res.data.title,
        ingredients: res.data.ingredients,
        instructions: res.data.instructions,
        category: res.data.category,
        photoUrl: res.data.photoUrl,
        cookingTime: res.data.cookingTime,
      })
    }
    fetchRecipe()
  }, [id])

  return <div>EditRecipe</div>
}

export default EditRecipe
