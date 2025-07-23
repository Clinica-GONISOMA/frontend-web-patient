"use client"
import { useState } from "react";
import TextInput from "../components/inputs/TextInput";

interface categoriesInterface {
  title: string;
  description: string;
  icon: string;
}

export default function Help() {
  const [search, setSearch] = useState("");

  const helpCategories: categoriesInterface[] = [
    {
      title: "Preguntas frecuentes",
      description: "Encuentra las respuestas a las preguntas más comunes",
      icon: "📝",
    },
    {
      title: "Contacto",
      description: "Ponte en contacto con nuestro equipo de soporte",
      icon: "📞",
    },
    {
      title: "Guías y tutoriales",
      description: "Accede a guías y tutoriales para usar nuestros servicios",
      icon: "📚",
    },
    {
      title: "Políticas de privacidad",
      description: "Conoce nuestras políticas de privacidad y seguridad",
      icon: "🔒",
    },
    {
      title: "Términos y condiciones",
      description: "Revisa nuestros términos y condiciones de uso",
      icon: "📜"
    },
    {
      title: "Soporte técnico",
      description: "Asistencia técnica para resolver problemas técnicos",
      icon: "💻",
    },
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-5xl font-bold mt-20">Centro de ayuda</p>
      <p className="text-lg mt-3">¿En que te podemos ayudar?</p>

      <TextInput
        label="Buscar por palabra, servicio o tema"
        className="w-120 mt-10"
        value={search}
        onChange={setSearch}
      />

      <div className="w-full border-t-1 border-[var(--color-foreground)]/20 my-20" />

      <div className="grid grid-cols-3 gap-10 mx-50 px-10">
        {helpCategories.map((category, index) => (
          <div key={index} className="flex items-center mb-10 bg-[var(--color-background)] p-6 rounded-4xl shadow-md cursor-pointer">
            <span className="text-5xl">{category.icon}</span>
            <div className="flex flex-col items-start gap-4 ml-5">

              <p className="text-2xl font-bold">{category.title}</p>
              <p className="text-lg">{category.description}</p>
            </div>

          </div>
        ))}
      </div>


    </div>
  );
}
