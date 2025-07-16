import React, { useState } from "react"
import axios from "axios"
// import { useNavigate } from "react-router-dom"

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""],
    category: "",
    photoUrl: "",
    cookingTime: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    handleInputChange("ingredients", newIngredients)
    const lastIngredient = formData.ingredients[formData.length - 1]
    if (error && lastIngredient.trim() !== "") {
      setError("")
    }
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

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Add Recipe</h1>
      <form className='space-y-4'>
        <div>
          <label className='block text-gray-700'>Title</label>
          <input
            type='text'
            value={formData.value}
            onChange={e => handleInputChange("title", e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type='text'
                value={ingredient}
                onChange={e => handleIngredientChange(index, e.target.value)}
                className='w-full p-2 border rounded'
                placeholder={`Ingredient ${index + 1}`}
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type='button'
                  onClick={() => removeIngredient(index)}
                  className='ml-2 text-red-500 hover:text-red-700'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type='button'
            className='text-blue-500 hover:underline'
            onClick={addIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipe
