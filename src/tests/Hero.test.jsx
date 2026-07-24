import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../components/Hero'; // Ajusta la ruta si es necesario

describe('Pruebas para el componente Hero', () => {
  test('debe renderizar los títulos principales y ubicación correctamente', () => {
    render(<Hero />);

    // Verificamos ubicación
    expect(screen.getByText(/Est. Zempoala, Hidalgo/i)).toBeInTheDocument();

    // Verificamos los títulos principales LEMON BROS
    expect(screen.getByText('LEMON')).toBeInTheDocument();
    expect(screen.getByText('BROS')).toBeInTheDocument();

    // Verificamos el eslogan
    expect(screen.getByText(/Parrilla artesanal al fuego vivo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sabor que prende desde el primer mordisco/i)).toBeInTheDocument();
  });

  test('debe contener los enlaces CTA con sus respectivos atributos', () => {
    render(<Hero />);

    // Botón Ver Menú
    const menuLink = screen.getByRole('link', { name: /Ver Menú/i });
    expect(menuLink).toBeInTheDocument();
    expect(menuLink).toHaveAttribute('href', '#menu');

    // Botón Pedir por WhatsApp
    const whatsappLink = screen.getByRole('link', { name: /Pedir por WhatsApp/i });
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/525548023904');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('debe renderizar los elementos decorativos (llamas y brasas)', () => {
    const { container } = render(<Hero />);

    // Verificar que existan las flamas en el DOM (FlameGroup)
    const flameGroups = container.querySelectorAll('.flame-group');
    expect(flameGroups.length).toBeGreaterThan(0);

    const flames = container.querySelectorAll('.flame');
    expect(flames.length).toBeGreaterThan(0);

    // Verificar que existan exactamente 20 brasas (Embers)
    const embers = container.querySelectorAll('.ember');
    expect(embers).toHaveLength(20);
  });

  test('debe renderizar el indicador de scroll', () => {
    const { container } = render(<Hero />);
    
    // Verificamos la flecha decorativa inferior
    const scrollIcon = container.querySelector('svg');
    expect(scrollIcon).toBeInTheDocument();
  });
});