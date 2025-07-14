import express from "express"
import Recipe from "../models/Recipe.js"

const router = express.Router()

// Route to create Recipe
router.post("/", async (req, res) => {
  const { title, ingredients, instructions, category, photoUrl, cookingTime } =
    req.body

  try {
    if (
      !title ||
      !ingredients ||
      !instructions ||
      !category ||
      !photoUrl ||
      !cookingTime
    ) {
      return res.status(400).json({ message: "Please fill all the fields!" })
    }
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      category,
      photoUrl,
      cookingTime,
    })
    res.status(201).json(recipe)
  } catch (err) {
    res.status(500).json({ message: "Bad Request. Server Error!" })
  }
})

// Route to get Recipes
router.get("/", async (req, res) => {
  const { category } = req.query

  try {
    const query = category ? { category } : {}
    const recipes = await Recipe.find(query)
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ message: "Bad Request. Server Error!" })
  }
})
