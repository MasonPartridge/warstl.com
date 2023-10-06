"use client";
import { useState, useEffect } from "react";
import { Unit, UnitCategory } from "@/components/common-interfaces"

export default function UnitPage({
  params,
}: {
  params: { gameSystem: string };
}) {
  const { gameSystem } = params;
  const [unitCategories, setUnitCategories] = useState<UnitCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/unitCategories/${gameSystem}`)
      .then((res) => res.json())
      .then((data) => {
        setUnitCategories(data);
        setLoading(false);
      });
  }, [gameSystem]);

  return (
    <main className="flex min-h-screen gap-4 text-text flex-col max-w-screen-lg w-[100%] items-center p-4 pt-24 bg-background">
      <h1 className="text-3xl">Unit Page</h1>
      <div className="w-full">
        {loading ? (
          <p className="bg-accent text-background flex items-center px-4 w-full h-16">Loading...</p>
        ) : (
          unitCategories.map((category : UnitCategory) => (
            <div key={category.name}>
              <h1 className="bg-accent text-background flex items-center px-4 w-full h-16">{category.name}</h1>
              <div>
                {category.units.map((unit : Unit) => (
                  <div key={unit.name} className="bg-secondary text-background flex items-center px-4 w-full h-16">
                    {unit.name}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
