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

// Route to get a single recipe
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found!" })
    }
    res.json(recipe)
  } catch (err) {
    res.status(500).json({ message: "Bad Request. Server Error!" })
  }
})

// Route to update a recipe
router.put("/:id", async (req, res) => {
  const { title, ingredients, instructions, category, photoUrl, cookingTime } =
    req.body

  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found!" })
    }

    recipe.title = title || recipe.title
    recipe.ingredients = ingredients || recipe.ingredients
    recipe.instructions = instructions || recipe.instructions
    recipe.category = category || recipe.category
    recipe.photoUrl = photoUrl || recipe.photoUrl
    recipe.cookingTime = cookingTime || recipe.cookingTime

    const updatedRecipe = await recipe.save()
  } catch (err) {
    res.status(500).json({ message: "Bad Request. Server Error!" })
  }
})
