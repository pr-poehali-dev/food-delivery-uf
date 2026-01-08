import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuData: MenuItem[] = [
  { id: '1', name: 'Чечевичный суп', description: 'Нежнейший крем-суп из отборной чечевицы, и свежих овощей.', price: 350, category: 'Супы', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '2', name: 'Суп лапша', description: 'Нежный говяжье-куриный бульон с домашней лапшой.', price: 320, category: 'Супы', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '3', name: 'Том-ям с морепродуктами', description: 'Острый тайский суп с добавлением морепродуктов с рисом.', price: 480, category: 'Супы', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '4', name: 'Борщ', description: 'Настоящий славянский суп, на говяжье-курином бульоне, с добавлением сала.', price: 340, category: 'Супы', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  
  { id: '5', name: 'Индийский карри с морепродуктами', description: 'Остро-сливочное блюдо с добавление свежих овощей и морепродуктов.', price: 520, category: 'Пан-Азия', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '6', name: 'Индийский чикен-карри', description: 'Остро-сливочное блюдо с добавление свежих овощей и цыпленка.', price: 450, category: 'Пан-Азия', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '7', name: 'Пад-Тай с цыпленком', description: 'Острое блюдо с пряным послевкусием с добавлением молодого цыпленка.', price: 440, category: 'Пан-Азия', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '8', name: 'Пад-Тай с морепродуктами', description: 'Острое блюдо с пряным послевкусием с добавлением морепродуктов.', price: 510, category: 'Пан-Азия', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  
  { id: '9', name: 'Хинкали с говядиной-свининой', description: 'Сочнейшие хинкали с миксом фарша говядины и свинины в фирменном тесте собственного производства.', price: 380, category: 'Хинкали', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  { id: '10', name: 'Хинкали с ягненком', description: 'Сочнейшие хинкали с фаршем ягненка в фирменном тесте собственного производства.', price: 420, category: 'Хинкали', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  { id: '11', name: 'Хинкали с говядиной', description: 'Сочнейшие хинкали с фаршем говядины в фирменном тесте собственного производства.', price: 400, category: 'Хинкали', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  { id: '12', name: 'Хинкали с цыпленком и сыром', description: 'Сочнейшие хинкали с цыпленком и копченным сыром в фирменном тесте собственного производства.', price: 390, category: 'Хинкали', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  { id: '13', name: 'Хинкали с миксом сыров', description: 'Сочнейшие хинкали с миксом сыров в фирменном тесте собственного производства.', price: 410, category: 'Хинкали', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  
  { id: '14', name: 'Пицца Пепперони', description: 'Классическая пицца с воздушным тестом, ароматной пеперони и тянущимся сыром.', price: 550, category: 'Пицца', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/25c496e6-59d0-44e4-a3ec-bccc7d567e32.jpg' },
  { id: '15', name: 'Пицца Маргарита', description: 'Классическая пицца с воздушным тестом, из рубленных томатов пелати, тянущейся моцареллой под соусом песто.', price: 480, category: 'Пицца', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/25c496e6-59d0-44e4-a3ec-bccc7d567e32.jpg' },
  { id: '16', name: 'Пицца 4-сыра', description: 'Разнообразие сыров заставит вас посмотреть на классическую пиццу по новому.', price: 580, category: 'Пицца', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/25c496e6-59d0-44e4-a3ec-bccc7d567e32.jpg' },
  { id: '17', name: 'Пицца Куриная карри', description: 'Оригинальное сочетание индийских специй и итальянской пиццы.', price: 560, category: 'Пицца', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/25c496e6-59d0-44e4-a3ec-bccc7d567e32.jpg' },
  { id: '18', name: 'Пицца с ростбифом', description: 'Премиальная пицца с нежным ростбифом.', price: 620, category: 'Пицца', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/25c496e6-59d0-44e4-a3ec-bccc7d567e32.jpg' },
  { id: '19', name: 'Пицца Морская', description: 'Щедрое сочетание морепродуктов на тонком тесте.', price: 650, category: 'Пицца', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/25c496e6-59d0-44e4-a3ec-bccc7d567e32.jpg' },
  
  { id: '20', name: 'Цезарь с курицей', description: 'Классический салат с нежной курицей и хрустящими сухариками.', price: 380, category: 'Салаты', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '21', name: 'Цезарь с креветками', description: 'Изысканный салат с сочными креветками.', price: 450, category: 'Салаты', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '22', name: 'Хрустящие баклажаны', description: 'Оригинальный салат с хрустящими баклажанами в азиатском стиле.', price: 340, category: 'Салаты', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '23', name: 'Салат Ростбиф', description: 'Сытный салат с нежным ростбифом.', price: 420, category: 'Салаты', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '24', name: 'Салат Ливанский', description: 'Свежий салат с восточными нотками.', price: 360, category: 'Салаты', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  
  { id: '25', name: 'Паста Карбонара', description: 'Классическая итальянская паста со сливочным соусом.', price: 420, category: 'Паста', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '26', name: 'Паста курица-грибы', description: 'Сытная паста с курицей и ароматными грибами.', price: 440, category: 'Паста', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '27', name: 'Паста с морепродуктами', description: 'Изысканная паста с морепродуктами.', price: 520, category: 'Паста', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '28', name: 'Паста классическая карбонара без сливок', description: 'Аутентичная карбонара по римскому рецепту.', price: 450, category: 'Паста', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  
  { id: '29', name: 'Хачапури по-Аджарски', description: 'Традиционная лодочка с сыром, маслом и яйцом.', price: 380, category: 'Хачапури', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  { id: '30', name: 'Хачапури карбонара', description: 'Авторское сочетание грузинской и итальянской кухни.', price: 420, category: 'Хачапури', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  { id: '31', name: 'Хачапури по-Мегрельски', description: 'Круглый хачапури с сыром внутри и снаружи.', price: 400, category: 'Хачапури', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  { id: '32', name: 'Хачапури по-Имеретински', description: 'Классический круглый хачапури с сыром.', price: 360, category: 'Хачапури', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/0bae9549-7cc5-49f4-80be-f601743e6d6c.jpg' },
  
  { id: '33', name: 'Картофель Фри', description: 'Классическое фри подойдет для детей.', price: 180, category: 'Закуски', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '34', name: 'Наггетсы', description: 'Обжаренное куриное филе в панировочных сухарях.', price: 220, category: 'Закуски', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '35', name: 'Сэндвич с креветками', description: 'Свежий сэндвич с сочными креветками.', price: 320, category: 'Закуски', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '36', name: 'Сэндвич с цыпленком', description: 'Сытный сэндвич с нежным цыпленком.', price: 280, category: 'Закуски', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  
  { id: '37', name: 'Морс ягодный', description: 'Освежающий напиток из лесных ягод.', price: 120, category: 'Напитки', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '38', name: 'Морс облепихово-апельсиновый', description: 'Витаминный напиток с облепихой и апельсином.', price: 140, category: 'Напитки', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '39', name: 'Детокс', description: 'Полезный детокс-напиток.', price: 160, category: 'Напитки', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
  { id: '40', name: 'Компот с сухофруктами', description: 'Домашний компот из отборных сухофруктов.', price: 110, category: 'Напитки', image: 'https://cdn.poehali.dev/projects/c576e287-32fd-48a6-a647-9ed3adb3dfa0/files/b873cfc1-7116-4fda-bb4c-98dcd3a21062.jpg' },
];

const categories = ['Все меню', 'Супы', 'Пан-Азия', 'Хинкали', 'Пицца', 'Салаты', 'Паста', 'Хачапури', 'Закуски', 'Напитки'];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Все меню');

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🍜</div>
              <div>
                <h1 className="text-2xl font-bold decorative-font">Pshonka s Maslom</h1>
                <p className="text-sm opacity-90">Доставка за 30 минут по Уфе</p>
              </div>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="lg" className="relative">
                  <Icon name="ShoppingCart" size={24} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-30" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                                  <Icon name="Minus" size={16} />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                                  <Icon name="Plus" size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="text-right font-semibold text-primary">
                              {item.price * item.quantity} ₽
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div className="border-t pt-4 mt-6">
                        <div className="flex justify-between text-xl font-bold mb-4">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 text-primary decorative-font">
              Многонациональная кухня
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Доставка по Уфе за 30 минут! Супы, пицца, хинкали, паста и многое другое.
            </p>
            <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Menu" size={20} className="mr-2" />
              Смотреть меню
            </Button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary decorative-font">Меню</h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>

          {activeCategory === 'Все меню' ? (
            categories.filter(cat => cat !== 'Все меню').map(category => (
              <div key={category} className="mb-16 animate-fade-in">
                <h3 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary/20 pb-2 decorative-font">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData
                    .filter(item => item.category === category)
                    .map(item => (
                      <Card key={item.id} className="hover:shadow-lg transition-all hover:scale-[1.02] overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <CardContent className="p-6">
                          <h4 className="text-xl font-semibold mb-2 text-foreground">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                            <Button onClick={() => addToCart(item)} className="gap-2">
                              <Icon name="Plus" size={18} />
                              В корзину
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="mb-16 animate-fade-in">
              <h3 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary/20 pb-2 decorative-font">
                {activeCategory}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuData
                  .filter(item => item.category === activeCategory)
                  .map(item => (
                    <Card key={item.id} className="hover:shadow-lg transition-all hover:scale-[1.02] overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold mb-2 text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                          <Button onClick={() => addToCart(item)} className="gap-2">
                            <Icon name="Plus" size={18} />
                            В корзину
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">За 30 минут по всей Уфе</p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Кухня мира</h3>
              <p className="text-muted-foreground">Грузинская, итальянская, азиатская</p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Свежие продукты</h3>
              <p className="text-muted-foreground">Готовим из отборных ингредиентов</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Pshonka s Maslom</h3>
              <p className="opacity-90">Доставка многонациональной кухни по Уфе</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <p className="opacity-90">Телефон: +7 (999) 123-45-67</p>
              <p className="opacity-90">Email: info@pshonka.ru</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Режим работы</h3>
              <p className="opacity-90">Ежедневно: 10:00 - 23:00</p>
              <p className="opacity-90">Доставка за 30 минут</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}