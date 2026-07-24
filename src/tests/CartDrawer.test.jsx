import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartDrawer from '../components/CartDrawer';
import * as CartContextModule from '../CartContext';

jest.mock('focus-trap-react', () => {
  return function DummyFocusTrap({ children }) {
    return <div>{children}</div>;
  };
});

const originalOpen = window.open;
beforeAll(() => {
  window.open = jest.fn();
});
afterAll(() => {
  window.open = originalOpen;
});

describe('Pruebas para CartDrawer', () => {
  const mockOnClose = jest.fn();
  const mockUpdateQty = jest.fn();
  const mockRemoveItem = jest.fn();
  const mockClearCart = jest.fn();
  const mockBuildWhatsApp = jest.fn().mockReturnValue('https://wa.me/123456789');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMockCart = (customValues = {}) => {
    const defaultValues = {
      items: [],
      updateQty: mockUpdateQty,
      removeItem: mockRemoveItem,
      clearCart: mockClearCart,
      total: 0,
      count: 0,
      buildWhatsApp: mockBuildWhatsApp,
      ...customValues,
    };

    jest.spyOn(CartContextModule, 'useCart').mockReturnValue(defaultValues);
  };

  test('no debe ser interactivo si open es false (clases de opacidad)', () => {
    setupMockCart();
    const { container } = render(<CartDrawer open={false} onClose={mockOnClose} />);
    
    const backdrop = container.querySelector('[role="button"]');
    expect(backdrop).toHaveClass('pointer-events-none');
  });

  test('debe cerrarse al hacer clic en el botón X', () => {
    setupMockCart();
    render(<CartDrawer open={true} onClose={mockOnClose} />);

    const buttons = screen.getAllByRole('button');
    const closeButton = buttons.find((btn) => btn.querySelector('svg'));

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('debe mostrar el estado de carrito vacío correctamente', () => {
    setupMockCart({ items: [], count: 0 });
    render(<CartDrawer open={true} onClose={mockOnClose} />);

    expect(screen.getByText('CARRITO VACÍO')).toBeInTheDocument();
    
    const viewMenuBtn = screen.getByText(/Ver menú →/i);
    fireEvent.click(viewMenuBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('debe renderizar productos, actualizar cantidades, eliminar e iniciar pedido de WhatsApp', () => {
    const mockItems = [
      { id: '1', name: 'Hamburguesa Doble', price: 150, qty: 2, img: 'burger.jpg' }
    ];

    setupMockCart({
      items: mockItems,
      count: 2,
      total: 300
    });

    render(<CartDrawer open={true} onClose={mockOnClose} />);

    // Verificación del nombre
    expect(screen.getByText('Hamburguesa Doble')).toBeInTheDocument();

    // Verificación de precio (usamos getAllByText porque aparece en el item y en el subtotal)
    const priceElements = screen.getAllByText(/\$300/i);
    expect(priceElements.length).toBeGreaterThanOrEqual(1);

    // Probar botón de incremento (+1)
    const btnPlus = screen.getByText('+');
    fireEvent.click(btnPlus);
    expect(mockUpdateQty).toHaveBeenCalledWith('1', 1);

    // Probar botón de decremento (-1)
    const btnMinus = screen.getByText('−');
    fireEvent.click(btnMinus);
    expect(mockUpdateQty).toHaveBeenCalledWith('1', -1);

    // Probar eliminar item
    const removeButtons = screen.getAllByRole('button');
    const removeBtn = removeButtons.find(
      (btn) => btn.className.includes('hover:text-red-400') && !btn.textContent.includes('Vaciar')
    );
    fireEvent.click(removeBtn);
    expect(mockRemoveItem).toHaveBeenCalledWith('1');

    // Probar botón de pedir por WhatsApp
    const whatsappBtn = screen.getByText(/Pedir por WhatsApp/i);
    fireEvent.click(whatsappBtn);
    expect(mockBuildWhatsApp).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith('https://wa.me/123456789', '_blank');

    // Probar botón de vaciar carrito
    const clearBtn = screen.getByText(/Vaciar carrito/i);
    fireEvent.click(clearBtn);
    expect(mockClearCart).toHaveBeenCalled();
  });

  test('debe cerrarse al hacer clic o presionar Enter en el backdrop', () => {
    setupMockCart();
    const { container } = render(<CartDrawer open={true} onClose={mockOnClose} />);

    const backdrop = container.querySelector('[role="button"]');

    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(backdrop, { key: 'Enter' });
    expect(mockOnClose).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(backdrop, { key: ' ' });
    expect(mockOnClose).toHaveBeenCalledTimes(3);
  });
});