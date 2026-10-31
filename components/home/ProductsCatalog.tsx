'use client';

import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  X,
  MessageCircle,
  Package,
} from 'lucide-react';
import {
  BarberProduct,
  buildProductOrderWhatsAppUrl,
  computeCartSummary,
  createMinimalistProductSvg,
  fetchPublicProducts,
  formatCurrencyBRL,
  ProductCartItem,
} from '../../lib/barberCatalog';

interface ProductsCatalogProps {
  products?: BarberProduct[];
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  products = [],
}) => {
  const [dynamicProducts, setDynamicProducts] = useState<BarberProduct[]>(products);
  const [cart, setCart] = useState<Record<string, ProductCartItem>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setDynamicProducts(products);
      return;
    }

    let active = true;
    fetchPublicProducts().then((rows) => {
      if (!active) return;
      setDynamicProducts(rows);
    });
    return () => {
      active = false;
    };
  }, [products]);

  const catalogList =
    Array.isArray(products) && products.length > 0 ? products : dynamicProducts;

  const cartItems: ProductCartItem[] = Object.values(cart).filter(
    (item) => item && item.quantity > 0
  );

  const { totalItems, totalFormatted } = computeCartSummary(cartItems);
  const whatsappOrderUrl = buildProductOrderWhatsAppUrl(cartItems);

  const handleAddProduct = (product: BarberProduct) => {
    setCart((prev) => {
      const existing = prev[product.id];
      const currentQty = existing ? existing.quantity : 0;
      if (product.stock_quantity > 0 && currentQty >= product.stock_quantity) {
        return prev;
      }
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: currentQty + 1,
        },
      };
    });
  };

  const handleDecrementProduct = (productId: string) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing || existing.quantity <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: {
          ...existing,
          quantity: existing.quantity - 1,
        },
      };
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const handleImageFallback = (
    e: React.SyntheticEvent<HTMLImageElement>,
    product: BarberProduct,
    idx: number
  ) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = createMinimalistProductSvg(
      product.name.toUpperCase().slice(0, 22),
      `ESTOQUE: ${product.stock_quantity} · ${product.price_formatted}`,
      idx % 2 === 0 ? '#DC2626' : '#1D4ED8',
      idx % 4 === 0
        ? 'jar'
        : idx % 4 === 1
        ? 'dropper'
        : idx % 4 === 2
        ? 'pump'
        : 'shampoo'
    );
  };

  return (
    <>
      <section
        id="produtos"
        className="scroll-mt-16 py-12 sm:py-16 bg-black border-b border-zinc-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono text-blue-500 uppercase tracking-wider mb-1">
                02. Linha Exclusiva
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Catálogo de Produtos
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label={`Abrir carrinho de produtos (${totalItems} itens)`}
              className="inline-flex items-center gap-2 min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-950 border border-zinc-800 hover:border-blue-500 transition-colors shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-blue-500" aria-hidden="true" />
              <span className="hidden sm:inline">Carrinho</span>
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-red-600 text-white tabular-nums">
                {totalItems}
              </span>
            </button>
          </div>

          {/* Dynamic Products from public.products: Horizontal Carousel on Mobile, Responsive Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {catalogList.map((product, idx) => {
              const quantityInCart = cart[product.id]?.quantity ?? 0;
              const isOutOfStock = product.stock_quantity <= 0;
              const isStockLimitReached =
                product.stock_quantity > 0 &&
                quantityInCart >= product.stock_quantity;

              return (
                <article
                  key={product.id}
                  className="snap-start shrink-0 w-[280px] md:w-auto rounded-2xl backdrop-blur-md bg-zinc-950/60 border border-zinc-900 p-6 flex flex-col justify-between transition-colors hover:border-zinc-800"
                >
                  <div>
                    <div className="relative mb-4">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageFallback(e, product, idx)}
                        className="w-full h-44 object-cover object-center rounded-xl border border-zinc-900"
                      />
                      {quantityInCart > 0 && (
                        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-600 text-white shadow-lg tabular-nums">
                          {quantityInCart} no carrinho
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs font-light text-zinc-400 tracking-wide font-mono mb-2 tabular-nums">
                      <span className="text-blue-400">{product.category}</span>
                      <span className="inline-flex items-center gap-1">
                        <Package
                          className="w-3.5 h-3.5 text-blue-500"
                          aria-hidden="true"
                        />
                        {isOutOfStock
                          ? 'Esgotado'
                          : `${product.stock_quantity} em estoque`}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-white mb-1.5">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="text-xs font-light text-zinc-400 tracking-wide line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                    <span className="font-mono text-lg font-bold text-white tabular-nums">
                      {product.price_formatted}
                    </span>

                    <button
                      type="button"
                      disabled={isOutOfStock || isStockLimitReached}
                      onClick={() => handleAddProduct(product)}
                      aria-label={`Adicionar ${product.name} ao carrinho`}
                      className={`inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-lg text-xs font-semibold text-white whitespace-nowrap shrink-0 ${
                        isOutOfStock || isStockLimitReached
                          ? 'bg-zinc-900 text-zinc-400 border border-zinc-800 cursor-not-allowed transition-colors'
                          : 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        {isOutOfStock
                          ? 'Esgotado'
                          : quantityInCart > 0
                          ? `Adicionar (${quantityInCart})`
                          : 'Adicionar'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Cart Widget with exact requested structure */}
      <div className="fixed bottom-6 right-4 z-50 shadow-2xl shadow-black/80 rounded-2xl">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label={`Ver carrinho de produtos com ${totalItems} itens selecionados`}
          className={`group flex items-center gap-2.5 min-h-[44px] px-3.5 py-2 rounded-2xl backdrop-blur-md bg-zinc-950/95 border transition-all duration-300 cursor-pointer ${
            totalItems > 0
              ? 'border-red-600/80 hover:border-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50'
              : 'border-zinc-800 hover:border-blue-500'
          }`}
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-xl bg-zinc-900 border border-zinc-800">
            <ShoppingBag
              className={`w-3.5 h-3.5 ${
                totalItems > 0 ? 'text-red-500' : 'text-blue-500'
              }`}
              aria-hidden="true"
            />
          </div>

          <div className="text-left">
            <p className="text-[10px] font-light font-mono uppercase tracking-wider text-zinc-400 leading-none">
              Carrinho
            </p>
            <p className="text-xs font-bold text-white font-mono tabular-nums mt-0.5">
              {totalItems > 0 ? totalFormatted : '0 itens'}
            </p>
          </div>

          <span
            data-testid="floating-cart-count"
            className={`inline-flex items-center justify-center min-w-[24px] h-5 px-1.5 rounded-lg text-xs font-mono font-bold tabular-nums ${
              totalItems > 0
                ? 'bg-red-600 text-white'
                : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
            }`}
          >
            {totalItems}
          </span>
        </button>
      </div>

      {/* Lateral Cart Drawer / Modal */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[60] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Over Panel */}
          <aside className="relative z-10 w-full max-w-md bg-zinc-950 border-l border-zinc-900 h-full flex flex-col justify-between shadow-2xl">
            {/* Drawer Header */}
            <div className="p-5 border-b border-zinc-900 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <ShoppingBag
                    className="w-4 h-4 text-red-500"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3
                    id="cart-drawer-title"
                    className="font-display text-lg font-bold text-white leading-tight"
                  >
                    Seu Carrinho
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono tabular-nums">
                    {totalItems}{' '}
                    {totalItems === 1 ? 'item selecionado' : 'itens selecionados'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Fechar carrinho"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Content: Selected Products List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full min-h-[240px] flex flex-col items-center justify-center text-center px-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
                    <ShoppingBag
                      className="w-5 h-5 text-blue-500"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-display text-base font-bold text-white mb-1">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-xs text-zinc-400 max-w-xs mb-4">
                    Adicione produtos do catálogo oficial do JM Barberclub para
                    finalizar seu pedido via WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold text-white bg-zinc-900 border border-blue-900/60 hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    Explorar Produtos
                  </button>
                </div>
              ) : (
                cartItems.map(({ product, quantity }, idx) => {
                  const itemSubtotal = formatCurrencyBRL(
                    product.price * quantity
                  );
                  const reachedMaxStock =
                    product.stock_quantity > 0 &&
                    quantity >= product.stock_quantity;

                  return (
                    <div
                      key={product.id}
                      className="rounded-2xl bg-black border border-zinc-900 p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageFallback(e, product, idx)}
                          className="w-14 h-14 object-cover object-center rounded-xl border border-zinc-900 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-display text-sm font-bold text-white leading-snug">
                            {product.name}
                          </h4>
                          <p className="text-xs text-zinc-400 font-mono tabular-nums mt-0.5">
                            {product.price_formatted} un.
                          </p>
                          <p className="text-xs font-mono font-bold text-blue-400 tabular-nums mt-0.5">
                            Subtotal: {itemSubtotal}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="inline-flex items-center rounded-xl bg-zinc-950 border border-zinc-800 p-1">
                          <button
                            type="button"
                            onClick={() => handleDecrementProduct(product.id)}
                            aria-label={`Diminuir quantidade de ${product.name}`}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-white tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            disabled={reachedMaxStock}
                            onClick={() => handleAddProduct(product)}
                            aria-label={`Aumentar quantidade de ${product.name}`}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                              reachedMaxStock
                                ? 'text-zinc-600 cursor-not-allowed'
                                : 'text-zinc-300 hover:text-white hover:bg-zinc-900 cursor-pointer'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(product.id)}
                          aria-label={`Remover ${product.name} do carrinho`}
                          className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-red-600/50 flex items-center justify-center text-zinc-500 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer: Total & WhatsApp Checkout Button */}
            <div className="p-5 border-t border-zinc-900 bg-black space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">
                    Valor Total do Pedido
                  </span>
                  {cartItems.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearCart}
                      className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Limpar carrinho
                    </button>
                  )}
                </div>
                <span
                  data-testid="cart-total-value"
                  className="font-mono text-xl font-bold text-white tabular-nums"
                >
                  {totalFormatted}
                </span>
              </div>

              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={cartItems.length === 0}
                onClick={(e) => {
                  if (cartItems.length === 0) {
                    e.preventDefault();
                  }
                }}
                className={`w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white whitespace-nowrap ${
                  cartItems.length > 0
                    ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 cursor-pointer'
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed transition-colors'
                }`}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Finalizar Pedido via WhatsApp</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default ProductsCatalog;
