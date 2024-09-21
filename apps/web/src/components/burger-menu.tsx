import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, List, Menu, Plus, History } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogDescription } from "@radix-ui/react-dialog";

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription hidden>Навигационное меню</DialogDescription>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="size-8" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Меню</DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col p-4 pt-0">
          <Link to="/" className="py-3 hover:underline flex items-center gap-x-3">
            <Home className="size-6" />
            <span className="text-lg font-medium">Главная</span>
          </Link>
          <Link to="/top-up" className="py-3 hover:underline flex items-center gap-x-3">
            <Plus className="size-6" />
            <span className="text-lg font-medium">Пополнить баланс</span>
          </Link>
          <Link to="/booking-list" className="py-3 hover:underline flex items-center gap-x-3">
            <List className="size-6" />
            <span className="text-lg font-medium">История бронирований</span>
          </Link>
          <Link to="/payments" className="py-3 hover:underline flex items-center gap-x-3">
            <History className="size-6" />
            <span className="text-lg font-medium">История платежей</span>
          </Link>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default BurgerMenu;
