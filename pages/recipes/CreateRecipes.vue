<template>
  <div class="create-recipe-page bg-gray-100 min-h-screen p-6 flex justify-center items-center">
    <div class="w-full max-w-2xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Recipe</h1>
      <form @submit.prevent="createRecipe" class="bg-white shadow-md rounded-lg p-6 space-y-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-gray-700 font-semibold mb-2">Recipe Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="E.g., Misir Wot"
            class="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            id="description"
            v-model="description"
            placeholder="E.g., A spicy lentil stew served with injera."
            class="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            required
          ></textarea>
        </div>

        <!-- Featured Image -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            @change="uploadFeaturedImage"
            class="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <div v-if="featuredImage" class="mt-4">
            <img
              :src="featuredImage"
              alt="Featured Preview"
              class="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <!-- Additional Images -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Additional Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="uploadAdditionalImages"
            class="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div class="grid grid-cols-3 gap-4 mt-4">
            <img
              v-for="(img, index) in additionalImages"
              :key="index"
              :src="img"
              alt="Additional Preview"
              class="w-full h-32 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            id="category"
            v-model="category"
            class="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option disabled value="">Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        <!-- Preparation Time -->
        <div>
          <label for="preparation_time" class="block text-gray-700 font-semibold mb-2">Preparation Time (Minutes)</label>
          <input
            id="preparation_time"
            v-model="preparationTime"
            type="number"
            min="1"
            placeholder="E.g., 20"
            class="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Ingredients -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Ingredients</label>
          <div v-for="(ingredient, index) in ingredients" :key="index" class="flex items-center gap-2 mb-2">
            <input
              type="text"
              v-model="ingredient.name"
              placeholder="E.g., 1 cup flour"
              class="flex-1 border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              @click="removeIngredient(index)"
              class="text-red-500 hover:text-red-700 transition"
            >
              ✕
            </button>
          </div>
          <button
            type="button"
            @click="addIngredient"
            class="text-blue-500 hover:text-blue-700 transition font-semibold"
          >
            + Add Ingredient
          </button>
        </div>

        <!-- Directions -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Directions</label>
          <div v-for="(step, index) in directions" :key="index" class="flex items-center gap-2 mb-2">
            <textarea
              v-model="step.description"
              placeholder="E.g., Mix all ingredients in a bowl"
              class="flex-1 border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              rows="2"
              required
            ></textarea>
            <button
              type="button"
              @click="removeDirection(index)"
              class="text-red-500 hover:text-red-700 transition"
            >
              ✕
            </button>
          </div>
          <button
            type="button"
            @click="addDirection"
            class="text-blue-500 hover:text-blue-700 transition font-semibold"
          >
            + Add Step
          </button>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe(
    $title: String!
    $description: String!
    $featured_image: String!
    $additional_images: [String!]!
    $category: String!
    $preparation_time: Int!
    $ingredients: [String!]!
    $directions: [String!]!
  ) {
    addRecipe(
      title: $title
      description: $description
      featured_image: $featured_image
      additional_images: $additional_images
      category: $category
      preparation_time: $preparation_time
      ingredients: $ingredients
      directions: $directions
    ) {
      id
      title
    }
  }
`;

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const featuredImage = ref("");
    const additionalImages = ref([]);
    const category = ref("");
    const preparationTime = ref(null);
    const ingredients = ref([{ name: "" }]);
    const directions = ref([{ description: "" }]);
    const { mutate: createRecipe } = useMutation(CREATE_RECIPE_MUTATION);

    const addIngredient = () => ingredients.value.push({ name: "" });
    const removeIngredient = (index) => ingredients.value.splice(index, 1);

    const addDirection = () => directions.value.push({ description: "" });
    const removeDirection = (index) => directions.value.splice(index, 1);

    const isValidImage = (file) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return file && allowedTypes.includes(file.type);
    };

    const uploadFeaturedImage = async (event) => {
        const file = event.target.files[0];
        if (file && isValidImage(file)) {
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "your_upload_preset"); // Cloudinary preset

            const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            featuredImage.value = data.secure_url; // The uploaded image URL
          } catch (error) {
            alert("Failed to upload image.");
            console.error("Image upload error:", error);
          }
        } else {
          alert("Please upload a valid image.");
        }
      };


    const uploadAdditionalImages = (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (isValidImage(file)) {
          additionalImages.value.push(URL.createObjectURL(file));
        } else {
          alert("Please upload valid images.");
          event.target.value = '';
          break;
        }
      }
    };

    const createRecipeHandler = async () => {
      if (!title.value || !description.value || !featuredImage.value || !category.value || !preparationTime.value) {
        alert("All required fields must be filled out.");
        return;
      }

      try {
        const { data } = await createRecipe({
          variables: {
            title: title.value,
            description: description.value,
            featured_image: featuredImage.value,
            additional_images: additionalImages.value,
            category: category.value,
            preparation_time: preparationTime.value,
            ingredients: ingredients.value.map((ing) => ing.name),
            directions: directions.value.map((step) => step.description),
          },
        });

        alert(`Recipe "${data.addRecipe.title}" created successfully!`);
        resetForm();
      } catch (error) {
        console.error("Error creating recipe:", error);
        alert(`Failed to create recipe: ${error.message}`);
      }
    };

    const resetForm = () => {
      title.value = "";
      description.value = "";
      featuredImage.value = "";
      additionalImages.value = [];
      category.value = "";
      preparationTime.value = null;
      ingredients.value = [{ name: "" }];
      directions.value = [{ description: "" }];
    };

    return {
      title,
      description,
      featuredImage,
      additionalImages,
      category,
      preparationTime,
      ingredients,
      directions,
      addIngredient,
      removeIngredient,
      addDirection,
      removeDirection,
      uploadFeaturedImage,
      uploadAdditionalImages,
      createRecipe: createRecipeHandler,
    };
  },
};
</script>