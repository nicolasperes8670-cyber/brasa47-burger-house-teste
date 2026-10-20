import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  Check, 
  ArrowRight,
  Info,
  Sliders,
  Utensils
} from 'lucide-react';

// CONFIGURAÇÕES DA HAMBURGUERIA
const STORE_CONFIG = {
  name: "BRASA 47",
  tagline: "BURGER HOUSE",
  slogan: "Fogo forte, paciência extrema e ingredientes nobres.",
  address: "Rua do Comércio, 470 - Centro, Erechim - RS",
  city: "Erechim - RS",
  whatsapp: "5554999998888", // Formato internacional sem caracteres especiais.
  deliveryFeeCents: 800, // R$ 8,00 em centavos
  currencySymbol: "R$",
  openingHours: [
    { days: "Quarta a Domingo", hours: "18h30 às 23h00" }
  ],
  socials: {
    instagram: "https://instagram.com/brasa47burger",
    facebook: "https://facebook.com/brasa47burger"
  },
  payments: ["Cartão de Crédito", "Cartão de Débito", "Pix", "Dinheiro"]
};

const MENU_CATEGORIES = [
  { id: "burgers", name: "Hambúrgueres", icon: "🍔" },
  { id: "combos", name: "Combos", icon: "🍟" },
  { id: "sides", name: "Acompanhamentos", icon: "🧅" },
  { id: "drinks", name: "Bebidas", icon: "🥤" },
  { id: "desserts", name: "Sobremesas", icon: "🍩" }
];

const MENU_ITEMS = [
  {
    id: "brasa-classic",
    name: "Brasa Classic",
    category: "burgers",
    priceCents: 3490,
    featured: true,
    description: "Blend bovino 180g grelhado no fogo forte, queijo cheddar inglês maturado, picles artesanal, cebola roxa e molho secreto Brasa no pão brioche amanteigado.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Hambúrguer artesanal Brasa Classic com cheddar derretido e pão brioche tostado",
    ingredients: ["Blend Bovino 180g", "Cheddar Maturado", "Picles da Casa", "Cebola Roxa", "Molho Brasa", "Pão Brioche"],
    addons: [
      { id: "add-bacon", name: "Bacon Crispy Defumado", priceCents: 600 },
      { id: "add-cheese", name: "Cheddar Extra", priceCents: 500 },
      { id: "add-patty", name: "Blend Bovino Extra 180g", priceCents: 1200 }
    ]
  },
  {
    id: "smoked-bacon",
    name: "Smoked Bacon 47",
    category: "burgers",
    priceCents: 3990,
    featured: true,
    description: "Blend 180g, tiras fartas de bacon defumado na lenha de macieira, queijo monterey jack, geleia de pimenta artesanal e maionese defumada no pão de pimenta preta.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Hambúrguer de bacon artesanal com geleia e queijo derretido",
    ingredients: ["Blend Bovino 180g", "Bacon Defumado", "Monterey Jack", "Geleia de Pimenta", "Maionese Defumada"],
    addons: [
      { id: "add-onion-rings", name: "Anéis de Cebola Crocantes no Lanche", priceCents: 500 },
      { id: "add-cheese", name: "Queijo Extra", priceCents: 500 },
      { id: "add-patty", name: "Blend Extra 180g", priceCents: 1200 }
    ]
  },
  {
    id: "truffle-gorgonzola",
    name: "Truffle Gorgon",
    category: "burgers",
    priceCents: 4290,
    featured: true,
    description: "Blend 180g de Wagyu/Angus, creme de gorgonzola premium, cogumelos salteados na manteiga de trufas brancas e rúcula fresca no pão australiano.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Hambúrguer gourmet com creme de gorgonzola e cogumelos salteados",
    ingredients: ["Blend Angus 180g", "Creme Gorgonzola", "Cogumelos Trufados", "Rúcula Fresca", "Pão Australiano"],
    addons: [
      { id: "add-bacon", name: "Bacon Crispy", priceCents: 600 },
      { id: "add-mushrooms", name: "Cogumelos Extra", priceCents: 700 }
    ]
  },
  {
    id: "veggie-green",
    name: "Veggie Earth 47",
    category: "burgers",
    priceCents: 3690,
    featured: false,
    description: "Burger empanado de cogumelos Paris e grão de bico, queijo provolone defumado, tomate confit, alface americana e maionese de ervas finas.",
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Hambúrguer vegetariano de grão de bico e cogumelos com vegetais frescos",
    ingredients: ["Burger Veggie 160g", "Provolone Defumado", "Tomate Confit", "Alface Fresca", "Maionese de Ervas"],
    addons: [
      { id: "add-cheese", name: "Queijo Vegano Alternativo", priceCents: 600 }
    ]
  },
  {
    id: "combo-duo-brasa",
    name: "Combo Duo Brasa",
    category: "combos",
    priceCents: 5490,
    featured: true,
    description: "1x Brasa Classic + 1x Batata Rustica com Páprica e Ervas + 1x Bebida à sua escolha.",
    image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Combo completo com hambúrguer artesanal, batatas rústicas e refrigerante",
    ingredients: ["Brasa Classic", "Batata Rústica Pequena", "Bebida 350ml"],
    addons: [
      { id: "add-large-fries", name: "Trocado para Batata Grande", priceCents: 500 },
      { id: "add-cheddar-bacon-fries", name: "Adicionar Cheddar e Bacon na Batata", priceCents: 800 }
    ]
  },
  {
    id: "fries-rustica",
    name: "Batatas Rústicas com Ervas",
    category: "sides",
    priceCents: 2290,
    featured: false,
    description: "Batatas cortadas à mão, fritas no ponto exato, temperadas com alecrim fresco, flor de sal e páprica defumada. Acompanha maionese da casa.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Porção de batatas rústicas douradas temperadas com alecrim",
    ingredients: ["Batata Selecionada", "Alecrim", "Páprica Defumada", "Maionese da Casa"],
    addons: [
      { id: "add-dip", name: "Molho Extra de Gorgonzola", priceCents: 400 }
    ]
  },
  {
    id: "onion-rings",
    name: "Onion Rings Crocantes",
    category: "sides",
    priceCents: 2490,
    featured: false,
    description: "Anéis de cebola empanados em massa panko crocante com especiarias. Acompanha molho barbecue artesanal defumado.",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Anéis de cebola dourados e crocantes em cestinha de metal",
    ingredients: ["Cebola Empanada Panko", "Molho Barbecue Defumado"],
    addons: []
  },
  {
    id: "craft-soda",
    name: "Refrigerante Artesanal Guaraná/Limão",
    category: "drinks",
    priceCents: 1190,
    featured: false,
    description: "Soda da casa feita com xarope natural de frutas brasileiras e água gaseificada.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Copo de vidro com gelo e soda artesanal refrescante",
    ingredients: ["Extrato Natural", "Água Gaseificada"],
    addons: []
  },
  {
    id: "churros-sandwich",
    name: "Sanduíche de Churros & Doce de Leite",
    category: "desserts",
    priceCents: 2190,
    featured: false,
    description: "Discos de churros crocantes passados no açúcar com canela, recheados com doce de leite argentino e sorvete de baunilha.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Sobremesa sofisticada de churros quentinhos com sorvete e doce de leite",
    ingredients: ["Massa de Churros", "Doce de Leite Viçosa", "Sorvete Favo de Baunilha"],
    addons: []
  }
];

const formatPrice = (cents) => {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('brasa47_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState("burgers");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [whatsappError, setWhatsappError] = useState("");

  const [customization, setCustomization] = useState({
    quantity: 1,
    removedIngredients: [],
    selectedAddons: [],
    notes: ""
  });

  const [checkoutData, setCheckoutData] = useState({
    customerName: "",
    orderType: "delivery",
    street: "",
    number: "",
    neighborhood: "",
    reference: "",
    paymentMethod: "Cartão de Crédito",
    needChange: false,
    changeAmount: "",
    generalNotes: ""
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('brasa47_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
  }, [cart]);

  const cartSubtotalCents = useMemo(() => {
    return cart.reduce((total, item) => total + (item.unitPriceCents * item.quantity), 0);
  }, [cart]);

  const deliveryFeeCents = checkoutData.orderType === 'delivery' ? STORE_CONFIG.deliveryFeeCents : 0;
  const cartTotalCents = cartSubtotalCents + deliveryFeeCents;
  const totalItemsCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    setCustomization({
      quantity: 1,
      removedIngredients: [],
      selectedAddons: [],
      notes: ""
    });
  };

  const handleToggleAddon = (addon) => {
    setCustomization(prev => {
      const exists = prev.selectedAddons.some(a => a.id === addon.id);
      return {
        ...prev,
        selectedAddons: exists 
          ? prev.selectedAddons.filter(a => a.id !== addon.id)
          : [...prev.selectedAddons, addon]
      };
    });
  };

  const handleToggleIngredient = (ing) => {
    setCustomization(prev => {
      const exists = prev.removedIngredients.includes(ing);
      return {
        ...prev,
        removedIngredients: exists
          ? prev.removedIngredients.filter(i => i !== ing)
          : [...prev.removedIngredients, ing]
      };
    });
  };

  const modalItemUnitPriceCents = useMemo(() => {
    if (!selectedProduct) return 0;
    const addonsTotal = customization.selectedAddons.reduce((sum, a) => sum + a.priceCents, 0);
    return selectedProduct.priceCents + addonsTotal;
  }, [selectedProduct, customization.selectedAddons]);

  const modalItemTotalCents = modalItemUnitPriceCents * customization.quantity;

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const cartItemId = `${selectedProduct.id}-${Date.now()}`;
    const cartItem = {
      cartItemId,
      productId: selectedProduct.id,
      name: selectedProduct.name,
      image: selectedProduct.image,
      unitPriceCents: modalItemUnitPriceCents,
      basePriceCents: selectedProduct.priceCents,
      quantity: customization.quantity,
      removedIngredients: customization.removedIngredients,
      selectedAddons: customization.selectedAddons,
      notes: customization.notes
    };

    setCart(prev => [...prev, cartItem]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleRemoveFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    setWhatsappError("");

    const rawNumber = STORE_CONFIG.whatsapp.replace(/\D/g, '');
    if (!rawNumber || rawNumber === "5554999998888" || rawNumber.length < 10) {
      setWhatsappError("Este é um site demonstrativo! O número de WhatsApp do estabelecimento precisa ser configurado no código (STORE_CONFIG.whatsapp) antes de prosseguir com pedidos reais.");
      return;
    }

    if (!checkoutData.customerName.trim()) {
      alert("Por favor, informe seu nome.");
      return;
    }

    if (checkoutData.orderType === 'delivery' && (!checkoutData.street.trim() || !checkoutData.number.trim() || !checkoutData.neighborhood.trim())) {
      alert("Por favor, preencha os dados completos do endereço para entrega.");
      return;
    }

    let message = `🔥 *NOVO PEDIDO - ${STORE_CONFIG.name}*\n`;
    message += `-----------------------------------\n`;
    message += `👤 *Cliente:* ${checkoutData.customerName}\n`;
    message += `📍 *Tipo:* ${checkoutData.orderType === 'delivery' ? 'Entrega em Domicílio' : 'Retirada no Balcão'}\n`;
    
    if (checkoutData.orderType === 'delivery') {
      message += `🏠 *Endereço:* ${checkoutData.street}, nº ${checkoutData.number}\n`;
      message += `🏙️ *Bairro:* ${checkoutData.neighborhood}\n`;
      if (checkoutData.reference.trim()) {
        message += `🧭 *Ref:* ${checkoutData.reference}\n`;
      }
    }

    message += `💳 *Pagamento:* ${checkoutData.paymentMethod}\n`;
    if (checkoutData.paymentMethod === 'Dinheiro' && checkoutData.needChange && checkoutData.changeAmount) {
      message += `💵 *Troco para:* R$ ${checkoutData.changeAmount}\n`;
    }

    message += `-----------------------------------\n`;
    message += `🍔 *ITENS DO PEDIDO:*\n\n`;

    cart.forEach((item) => {
      message += `*${item.quantity}x ${item.name}* (${formatPrice(item.unitPriceCents * item.quantity)})\n`;
      if (item.removedIngredients.length > 0) {
        message += `  ❌ *Sem:* ${item.removedIngredients.join(', ')}\n`;
      }
      if (item.selectedAddons.length > 0) {
        message += `  ➕ *Adicionais:* ${item.selectedAddons.map(a => `${a.name} (+${formatPrice(a.priceCents)})`).join(', ')}\n`;
      }
      if (item.notes.trim()) {
        message += `  📝 *Obs:* ${item.notes}\n`;
      }
      message += `\n`;
    });

    if (checkoutData.generalNotes.trim()) {
      message += `📝 *Observações do Pedido:* ${checkoutData.generalNotes}\n\n`;
    }

    message += `-----------------------------------\n`;
    message += `Subtotal: ${formatPrice(cartSubtotalCents)}\n`;
    if (checkoutData.orderType === 'delivery') {
      message += `Taxa de Entrega: ${formatPrice(deliveryFeeCents)}\n`;
    }
    message += `💰 *TOTAL FINAL: ${formatPrice(cartTotalCents)}*\n`;
    message += `-----------------------------------\n`;
    message += `_Pedido gerado via site BRASA 47_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#171717] text-[#F4EFE6] font-sans selection:bg-[#A66B46] selection:text-white flex flex-col">
      <div className="bg-[#A66B46]/20 border-b border-[#A66B46]/30 text-xs py-1.5 px-4 text-center text-[#F4EFE6]/80 flex items-center justify-center gap-2">
        <Info className="w-3.5 h-3.5 text-[#A66B46]" />
        <span>Projeto conceitual de portfólio para hamburguerias de Erechim & Região — RS.</span>
      </div>

      <header className="sticky top-0 z-40 bg-[#171717]/90 backdrop-blur-md border-b border-[#77766F]/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex flex-col group">
            <span className="font-serif text-2xl font-black tracking-wider text-[#F4EFE6] group-hover:text-[#A66B46] transition-colors">
              BRASA <span className="text-[#A66B46]">47</span>
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#77766F] uppercase -mt-1 font-semibold">
              Burger House
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="hover:text-[#A66B46] transition-colors">Início</a>
            <a href="#destaques" onClick={(e) => handleNavClick(e, 'destaques')} className="hover:text-[#A66B46] transition-colors">Destaques</a>
            <a href="#cardapio" onClick={(e) => handleNavClick(e, 'cardapio')} className="hover:text-[#A66B46] transition-colors">Cardápio</a>
            <a href="#historia" onClick={(e) => handleNavClick(e, 'historia')} className="hover:text-[#A66B46] transition-colors">Nossa História</a>
            <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')} className="hover:text-[#A66B46] transition-colors">Contato</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#77766F]/10 hover:bg-[#A66B46]/20 border border-[#77766F]/30 hover:border-[#A66B46] text-[#F4EFE6] transition-all flex items-center justify-center"
              aria-label="Abrir carrinho de compras"
            >
              <ShoppingBag className="w-5 h-5 text-[#F4EFE6]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A66B46] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <a
              href="#cardapio"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-none bg-[#A66B46] hover:bg-[#8e5a39] text-white font-medium text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-[#A66B46]/20"
            >
              Fazer Pedido
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#F4EFE6] hover:text-[#A66B46]"
              aria-label="Menu Principal"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#171717] border-b border-[#77766F]/20 px-6 py-6 space-y-4 animate-fadeIn">
            <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="block text-base font-medium text-[#F4EFE6] hover:text-[#A66B46]">Início</a>
            <a href="#destaques" onClick={(e) => handleNavClick(e, 'destaques')} className="block text-base font-medium text-[#F4EFE6] hover:text-[#A66B46]">Destaques</a>
            <a href="#cardapio" onClick={(e) => handleNavClick(e, 'cardapio')} className="block text-base font-medium text-[#F4EFE6] hover:text-[#A66B46]">Cardápio Completo</a>
            <a href="#historia" onClick={(e) => handleNavClick(e, 'historia')} className="block text-base font-medium text-[#F4EFE6] hover:text-[#A66B46]">Nossa História</a>
            <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')} className="block text-base font-medium text-[#F4EFE6] hover:text-[#A66B46]">Contato & Localização</a>
          </div>
        )}
      </header>

      <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717] via-[#171717]/80 to-[#171717] z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A66B46]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-[#77766F]/10 border border-[#A66B46]/40 px-3 py-1 text-xs uppercase tracking-widest text-[#A66B46] font-semibold">
                <Utensils className="w-3.5 h-3.5" />
                <span>Hamburgueria Artesanal no Fogo</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold leading-[1.1] text-[#F4EFE6]">
                A nobreza do fogo em cada <span className="italic text-[#A66B46]">mordida.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#77766F] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                {STORE_CONFIG.slogan} Blends de carnes nobres grelhados na brasa viva, queijos maturados e pães artesanais assados diariamente.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#cardapio"
                  className="w-full sm:w-auto px-8 py-4 bg-[#A66B46] hover:bg-[#8e5a39] text-white font-medium text-xs tracking-widest uppercase transition-all shadow-xl hover:shadow-[#A66B46]/30 flex items-center justify-center space-x-2 group"
                >
                  <span>Explorar Cardápio</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#historia"
                  className="w-full sm:w-auto px-8 py-4 border border-[#77766F]/40 hover:border-[#F4EFE6] text-[#F4EFE6] font-medium text-xs tracking-widest uppercase transition-all flex items-center justify-center"
                >
                  Conhecer a Marca
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1 rounded-none bg-gradient-to-tr from-[#A66B46]/40 to-transparent blur-lg opacity-50" />
                <div className="relative aspect-[4/5] bg-[#77766F]/10 border border-[#77766F]/20 overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                    alt="Hambúrguer artesanal gourmet grelhado na brasa BRASA 47"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent">
                    <p className="text-xs text-[#A66B46] uppercase font-semibold tracking-widest">Carro-Chefe da Casa</p>
                    <p className="font-serif text-xl text-[#F4EFE6] font-bold">Brasa Classic 180g</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[#77766F]/20 bg-[#171717]/50 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A66B46] font-bold">Nossa Filosofia</span>
          <h2 className="font-serif text-2xl sm:text-4xl leading-snug font-normal text-[#F4EFE6]">
            "Não acreditamos em atalhos nem em produção industrial. Acreditamos no tempo do fogo, na seleção criteriosa do gado e no contraste perfeito entre a crocância do pão e o suco da carne."
          </h2>
          <div className="w-12 h-0.5 bg-[#A66B46] mx-auto pt-1" />
        </div>
      </section>

      <section id="destaques" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#77766F]/20 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A66B46] font-bold">Seleção Especial</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE6] font-bold mt-1">
              Os Favoritos da Brasa
            </h2>
          </div>
          <p className="text-sm text-[#77766F] max-w-md mt-2 md:mt-0 font-light">
            Nossos lanches mais aclamados, preparados com blends exclusivos de cortes nobres grelhados em fogo direto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MENU_ITEMS.filter(item => item.featured).map(item => (
            <div 
              key={item.id}
              className="group bg-[#171717] border border-[#77766F]/20 hover:border-[#A66B46]/60 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="aspect-[4/3] relative overflow-hidden bg-[#77766F]/10">
                  <img 
                    src={item.image} 
                    alt={item.imageAlt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#171717]/90 backdrop-blur-sm border border-[#A66B46]/40 px-3 py-1 text-xs font-semibold text-[#A66B46]">
                    {formatPrice(item.priceCents)}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#F4EFE6] group-hover:text-[#A66B46] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#77766F] line-clamp-3 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleOpenProductModal(item)}
                  className="w-full py-3 bg-[#77766F]/10 hover:bg-[#A66B46] text-[#F4EFE6] hover:text-white border border-[#77766F]/30 hover:border-[#A66B46] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Personalizar e Adicionar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cardapio" className="py-24 bg-[#171717] border-t border-[#77766F]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#A66B46] font-bold">Experiência Completa</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE6] font-bold mt-2">
              Nosso Cardápio
            </h2>
            <p className="text-sm text-[#77766F] mt-3 font-light">
              Navegue pelas nossas categorias e monte seu pedido artesanal personalizado.
            </p>
          </div>

          <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-12 space-x-2 no-scrollbar">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? "bg-[#A66B46] border-[#A66B46] text-white shadow-lg"
                    : "bg-[#77766F]/10 border-[#77766F]/30 text-[#77766F] hover:text-[#F4EFE6] hover:border-[#77766F]"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.filter(item => item.category === activeCategory).map(item => (
              <div 
                key={item.id}
                className="bg-[#171717] border border-[#77766F]/20 hover:border-[#A66B46]/50 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#77766F]/10 mb-4 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.imageAlt} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-bold text-[#F4EFE6]">{item.name}</h3>
                    <span className="font-semibold text-sm text-[#A66B46]">{formatPrice(item.priceCents)}</span>
                  </div>

                  <p className="text-xs text-[#77766F] font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {item.ingredients.map((ing, idx) => (
                      <span key={idx} className="text-[10px] bg-[#77766F]/10 text-[#77766F] px-2 py-0.5 rounded-none">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenProductModal(item)}
                  className="w-full py-2.5 bg-[#A66B46]/10 hover:bg-[#A66B46] text-[#A66B46] hover:text-white border border-[#A66B46]/30 hover:border-[#A66B46] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Escolher & Montar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="historia" className="py-24 bg-[#171717] border-t border-[#77766F]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] bg-[#77766F]/10 border border-[#77766F]/20 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80" 
                  alt="Interior acolhedor e sofisticado da hamburgueria BRASA 47" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#A66B46] font-bold">Origem e Tradição</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE6] font-bold leading-tight">
                Forjados no fogo alto de Erechim.
              </h2>
              <p className="text-sm text-[#77766F] leading-relaxed font-light">
                A BRASA 47 nasceu do desejo de trazer para a região do Alto Uruguai uma experiência autêntica de burgueria de brasa viva. Combinamos cortes nobres bovinos selecionados a mão com uma técnica rigorosa de grelha em temperatura extrema.
              </p>
              <p className="text-sm text-[#77766F] leading-relaxed font-light">
                Cada receita reflete nosso compromisso com ingredientes frescos, pães artesanais selados na manteiga de garrafa e molhos autorais produzidos diariamente em nossa cozinha.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 bg-[#171717] border-t border-[#77766F]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#77766F]/5 border border-[#77766F]/20 p-8 space-y-4">
              <MapPin className="w-6 h-6 text-[#A66B46]" />
              <h3 className="font-serif text-xl font-bold text-[#F4EFE6]">Endereço</h3>
              <p className="text-xs text-[#77766F] leading-relaxed font-light">
                {STORE_CONFIG.address}<br />
                <span className="text-[#A66B46] mt-2 block font-semibold">(Endereço demonstrativo de Erechim)</span>
              </p>
            </div>

            <div className="bg-[#77766F]/5 border border-[#77766F]/20 p-8 space-y-4">
              <Clock className="w-6 h-6 text-[#A66B46]" />
              <h3 className="font-serif text-xl font-bold text-[#F4EFE6]">Horários de Funcionamento</h3>
              {STORE_CONFIG.openingHours.map((item, idx) => (
                <div key={idx} className="text-xs text-[#77766F] font-light">
                  <p className="font-semibold text-[#F4EFE6]">{item.days}</p>
                  <p>{item.hours}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#77766F]/5 border border-[#77766F]/20 p-8 space-y-4">
              <Phone className="w-6 h-6 text-[#A66B46]" />
              <h3 className="font-serif text-xl font-bold text-[#F4EFE6]">Atendimento & Pedidos</h3>
              <p className="text-xs text-[#77766F] leading-relaxed font-light">
                Faça seu pedido diretamente pelo nosso cardápio digital com envio para o WhatsApp oficial da loja.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href={STORE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#77766F]/10 hover:bg-[#A66B46] text-[#F4EFE6] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={STORE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#77766F]/10 hover:bg-[#A66B46] text-[#F4EFE6] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto bg-[#171717] border-t border-[#77766F]/20 py-12 text-center text-xs text-[#77766F]">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="font-serif text-xl font-bold text-[#F4EFE6] tracking-wider">
            BRASA <span className="text-[#A66B46]">47</span>
          </div>
          <p>© 2026 BRASA 47 — Burger House. Todos os direitos reservados.</p>
          <p className="text-[11px] text-[#77766F]/60 max-w-md mx-auto">
            Site demonstrativo desenvolvido para portfólio comercial de soluções web completas para restaurantes em Erechim/RS.
          </p>
        </div>
      </footer>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#171717] border border-[#77766F]/30 max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="relative aspect-[16/9] bg-[#77766F]/10">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.imageAlt} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 p-2 bg-[#171717]/80 hover:bg-[#A66B46] text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-2xl font-bold text-[#F4EFE6]">{selectedProduct.name}</h3>
                  <span className="text-lg font-bold text-[#A66B46]">{formatPrice(selectedProduct.priceCents)}</span>
                </div>
                <p className="text-xs text-[#77766F] mt-2 font-light leading-relaxed">{selectedProduct.description}</p>
              </div>

              {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                <div className="space-y-3 border-t border-[#77766F]/20 pt-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#F4EFE6] font-semibold">Remover Ingredientes da Receita:</h4>
                  <div className="space-y-2">
                    {selectedProduct.ingredients.map((ing, idx) => {
                      const isRemoved = customization.removedIngredients.includes(ing);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleToggleIngredient(ing)}
                          className={`w-full flex items-center justify-between p-2.5 text-xs border transition-all ${
                            isRemoved 
                              ? "bg-red-950/30 border-red-800/50 text-red-300" 
                              : "bg-[#77766F]/10 border-[#77766F]/20 text-[#F4EFE6] hover:border-[#77766F]"
                          }`}
                        >
                          <span>{ing}</span>
                          <span className="text-[10px] font-semibold">{isRemoved ? "Removido" : "Manter"}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedProduct.addons && selectedProduct.addons.length > 0 && (
                <div className="space-y-3 border-t border-[#77766F]/20 pt-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#F4EFE6] font-semibold">Adicionais Especiais:</h4>
                  <div className="space-y-2">
                    {selectedProduct.addons.map(addon => {
                      const isSelected = customization.selectedAddons.some(a => a.id === addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => handleToggleAddon(addon)}
                          className={`w-full flex items-center justify-between p-2.5 text-xs border transition-all ${
                            isSelected 
                              ? "bg-[#A66B46]/20 border-[#A66B46] text-[#F4EFE6]" 
                              : "bg-[#77766F]/10 border-[#77766F]/20 text-[#77766F] hover:border-[#77766F]"
                          }`}
                        >
                          <span className="flex items-center space-x-2">
                            <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[8px] ${isSelected ? 'border-[#A66B46] bg-[#A66B46] text-white' : 'border-[#77766F]'}`}>
                              {isSelected && "✓"}
                            </span>
                            <span>{addon.name}</span>
                          </span>
                          <span className="font-semibold text-[#A66B46]">+{formatPrice(addon.priceCents)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-2 border-t border-[#77766F]/20 pt-4">
                <label className="text-xs uppercase tracking-wider text-[#F4EFE6] font-semibold block">Observação do Item:</label>
                <textarea
                  value={customization.notes}
                  onChange={(e) => setCustomization(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Ex: Ponto da carne bem passado, molho à parte..."
                  rows={2}
                  className="w-full bg-[#77766F]/10 border border-[#77766F]/30 p-2.5 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#77766F]/20">
                <div className="flex items-center space-x-3 bg-[#77766F]/10 border border-[#77766F]/30 p-1">
                  <button
                    onClick={() => setCustomization(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                    className="p-1.5 text-[#F4EFE6] hover:bg-[#77766F]/20"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-2 text-[#F4EFE6]">{customization.quantity}</span>
                  <button
                    onClick={() => setCustomization(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                    className="p-1.5 text-[#F4EFE6] hover:bg-[#77766F]/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#77766F] uppercase block">Subtotal do Item</span>
                  <span className="text-xl font-bold text-[#A66B46]">{formatPrice(modalItemTotalCents)}</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#A66B46] hover:bg-[#8e5a39] text-white font-medium text-xs tracking-widest uppercase transition-all shadow-xl"
              >
                Adicionar ao Pedido • {formatPrice(modalItemTotalCents)}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsCartOpen(false)}
        >
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div 
              className="w-screen max-w-md bg-[#171717] border-l border-[#77766F]/30 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#77766F]/20 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#A66B46]" />
                  <h2 className="font-serif text-xl font-bold text-[#F4EFE6]">Seu Pedido</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2.5 rounded-full bg-[#77766F]/20 hover:bg-[#A66B46] text-[#F4EFE6] hover:text-white transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#A66B46]"
                  aria-label="Fechar carrinho"
                  title="Fechar (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-[#77766F]/40 mx-auto" />
                    <p className="text-sm text-[#77766F]">Sua sacola de pedidos está vazia.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 bg-[#A66B46] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Ver Cardápio
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.cartItemId}
                      className="bg-[#77766F]/10 border border-[#77766F]/20 p-4 space-y-3 relative"
                    >
                      <div className="flex space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover bg-[#77766F]/20"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif font-bold text-sm text-[#F4EFE6]">{item.name}</h4>
                            <button
                              onClick={() => handleRemoveFromCart(item.cartItemId)}
                              className="text-[#77766F] hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-xs font-semibold text-[#A66B46] block mt-0.5">
                            {formatPrice(item.unitPriceCents * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {(item.removedIngredients.length > 0 || item.selectedAddons.length > 0 || item.notes) && (
                        <div className="text-[11px] text-[#77766F] space-y-1 bg-[#171717]/50 p-2 border border-[#77766F]/10">
                          {item.removedIngredients.length > 0 && (
                            <p className="text-red-400/80">❌ Sem: {item.removedIngredients.join(', ')}</p>
                          )}
                          {item.selectedAddons.length > 0 && (
                            <p className="text-[#A66B46]">➕ {item.selectedAddons.map(a => a.name).join(', ')}</p>
                          )}
                          {item.notes && (
                            <p className="italic">📝 "{item.notes}"</p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-[#77766F]/10">
                        <span className="text-[10px] text-[#77766F] uppercase">Quantidade:</span>
                        <div className="flex items-center space-x-2 bg-[#171717] border border-[#77766F]/30 px-2 py-0.5">
                          <button
                            onClick={() => handleUpdateQuantity(item.cartItemId, -1)}
                            className="text-[#77766F] hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#F4EFE6] px-1">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.cartItemId, 1)}
                            className="text-[#77766F] hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[#77766F]/20 bg-[#171717] space-y-4">
                  <div className="space-y-1.5 text-xs text-[#77766F]">
                    <div className="flex justify-between">
                      <span>Subtotal dos itens:</span>
                      <span className="text-[#F4EFE6]">{formatPrice(cartSubtotalCents)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#F4EFE6] pt-2 border-t border-[#77766F]/20">
                      <span>Total estimado:</span>
                      <span className="text-[#A66B46]">{formatPrice(cartSubtotalCents)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-4 bg-[#A66B46] hover:bg-[#8e5a39] text-white font-medium text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Avançar para Dados de Entrega</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 bg-[#77766F]/10 hover:bg-[#77766F]/20 text-[#F4EFE6] border border-[#77766F]/30 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Continuar Comprando</span>
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="w-full py-2 text-[10px] text-[#77766F] hover:text-red-400 uppercase tracking-wider text-center block"
                  >
                    Esvaziar Carrinho
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-[#171717] border border-[#77766F]/30 max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-[#77766F]/20 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F4EFE6]">Finalizar Pedido</h3>
                <p className="text-xs text-[#77766F]">Preencha seus dados para envio pelo WhatsApp da loja.</p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 text-[#77766F] hover:text-[#F4EFE6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {whatsappError && (
              <div className="bg-red-950/50 border border-red-800 p-4 text-xs text-red-200 space-y-1">
                <p className="font-bold">⚠️ Atenção para personalização:</p>
                <p>{whatsappError}</p>
              </div>
            )}

            <form onSubmit={handleSendWhatsAppOrder} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#F4EFE6] font-semibold block mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={checkoutData.customerName}
                  onChange={(e) => setCheckoutData(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Ex: Gabriel Silva"
                  className="w-full bg-[#77766F]/10 border border-[#77766F]/30 p-3 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#F4EFE6] font-semibold block mb-2">
                  Modalidade do Pedido *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutData(prev => ({ ...prev, orderType: 'delivery' }))}
                    className={`py-3 text-xs font-semibold uppercase border transition-all ${
                      checkoutData.orderType === 'delivery'
                        ? 'bg-[#A66B46] border-[#A66B46] text-white'
                        : 'bg-[#77766F]/10 border-[#77766F]/30 text-[#77766F]'
                    }`}
                  >
                    Entrega (+{formatPrice(STORE_CONFIG.deliveryFeeCents)})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutData(prev => ({ ...prev, orderType: 'pickup' }))}
                    className={`py-3 text-xs font-semibold uppercase border transition-all ${
                      checkoutData.orderType === 'pickup'
                        ? 'bg-[#A66B46] border-[#A66B46] text-white'
                        : 'bg-[#77766F]/10 border-[#77766F]/30 text-[#77766F]'
                    }`}
                  >
                    Retirada no Balcão
                  </button>
                </div>
              </div>

              {checkoutData.orderType === 'delivery' && (
                <div className="space-y-3 bg-[#77766F]/5 border border-[#77766F]/20 p-4">
                  <h4 className="text-xs font-bold text-[#A66B46] uppercase">Endereço de Entrega (Erechim/RS)</h4>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <input
                        type="text"
                        required
                        placeholder="Rua / Avenida *"
                        value={checkoutData.street}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, street: e.target.value }))}
                        className="w-full bg-[#77766F]/10 border border-[#77766F]/30 p-2.5 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Número *"
                        value={checkoutData.number}
                        onChange={(e) => setCheckoutData(prev => ({ ...prev, number: e.target.value }))}
                        className="w-full bg-[#77766F]/10 border border-[#77766F]/30 p-2.5 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Bairro *"
                      value={checkoutData.neighborhood}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, neighborhood: e.target.value }))}
                      className="w-full bg-[#77766F]/10 border border-[#77766F]/30 p-2.5 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Ponto de Referência"
                      value={checkoutData.reference}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, reference: e.target.value }))}
                      className="w-full bg-[#77766F]/10 border border-[#77766F]/30 p-2.5 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs uppercase tracking-wider text-[#F4EFE6] font-semibold block mb-1">
                  Forma de Pagamento *
                </label>
                <select
                  value={checkoutData.paymentMethod}
                  onChange={(e) => setCheckoutData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="w-full bg-[#171717] border border-[#77766F]/30 p-3 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                >
                  {STORE_CONFIG.payments.map((method, idx) => (
                    <option key={idx} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {checkoutData.paymentMethod === 'Dinheiro' && (
                <div className="flex items-center space-x-3 bg-[#77766F]/10 p-3">
                  <input
                    type="checkbox"
                    id="needChange"
                    checked={checkoutData.needChange}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, needChange: e.target.checked }))}
                    className="accent-[#A66B46]"
                  />
                  <label htmlFor="needChange" className="text-xs text-[#F4EFE6]">Precisa de troco?</label>

                  {checkoutData.needChange && (
                    <input
                      type="text"
                      placeholder="Troco para quanto? (Ex: 100)"
                      value={checkoutData.changeAmount}
                      onChange={(e) => setCheckoutData(prev => ({ ...prev, changeAmount: e.target.value }))}
                      className="flex-1 bg-[#171717] border border-[#77766F]/30 p-1.5 text-xs text-[#F4EFE6] focus:border-[#A66B46] focus:outline-none"
                    />
                  )}
                </div>
              )}

              <div className="bg-[#77766F]/10 p-4 space-y-2 text-xs border border-[#77766F]/20">
                <div className="flex justify-between text-[#77766F]">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartSubtotalCents)}</span>
                </div>
                {checkoutData.orderType === 'delivery' && (
                  <div className="flex justify-between text-[#77766F]">
                    <span>Taxa de Entrega:</span>
                    <span>{formatPrice(STORE_CONFIG.deliveryFeeCents)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-[#F4EFE6] pt-2 border-t border-[#77766F]/20">
                  <span>Total do Pedido:</span>
                  <span className="text-[#A66B46]">{formatPrice(cartTotalCents)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Enviar Pedido pelo WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}