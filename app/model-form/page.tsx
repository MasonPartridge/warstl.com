"use client";
import { useState, useEffect } from "react";
import { Unit, UnitCategory, GameSystem } from "@/components/types";

interface FormData {
  name: string;
  description: string;
  unit: string;
  unitCategory: string;
  gameSystem: string;
  stlFileDownloadLink: string;
}

export default function ModelForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [unitCategory, setUnitCategory] = useState("");
  const [gameSystem, setGameSystem] = useState("");
  const [stlFileDownloadLink, setStlFileDownloadLink] = useState("");

  const [units, setUnits] = useState<Unit[]>([]);
  const [unitCategories, setUnitCategories] = useState<UnitCategory[]>([]);
  const [gameSystems, setGameSystems] = useState<GameSystem[]>([]);

  useEffect(() => {
    fetch("/api/units")
      .then((response) => response.json())
      .then((data) => setUnits(data));

    fetch("/api/unitCategories")
      .then((response) => response.json())
      .then((data) => setUnitCategories(data));

    fetch("/api/gameSystems")
      .then((response) => response.json())
      .then((data) => setGameSystems(data));
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData: FormData = {
      name,
      description,
      unit,
      unitCategory,
      gameSystem,
      stlFileDownloadLink,
    };
    fetch("/api/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-32 bg-secondary p-16 rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="unit" className="block font-medium mb-2">
          Unit
        </label>
        <select
          id="unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a unit</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="unitCategory" className="block font-medium mb-2">
          Unit Category
        </label>
        <select
          id="unitCategory"
          value={unitCategory}
          onChange={(event) => setUnitCategory(event.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a unit category</option>
          {unitCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="gameSystem" className="block font-medium mb-2">
          Game System
        </label>
        <select
          id="gameSystem"
          value={gameSystem}
          onChange={(event) => setGameSystem(event.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a game system</option>
          {gameSystems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="stlFileDownloadLink" className="block font-medium mb-2">
          STL File Download Link
        </label>
        <input
          type="text"
          id="stlFileDownloadLink"
          value={stlFileDownloadLink}
          onChange={(event) => setStlFileDownloadLink(event.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="postedBy" className="block font-medium mb-2">
          Posted By
        </label>
        <input
          type="text"
          id="postedBy"
          value="Benny Boi!"
          readOnly
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-medium text-white bg-accent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
