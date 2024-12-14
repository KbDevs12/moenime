"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      if (isOpen) {
        setIsOpen(false);
      }

      router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
    }

    setSearchQuery("");
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="desktop backdrop-blur-10 bg-opacity-50 hidden md:flex sticky top-2 z-50 flex-row items-center mx-auto rounded-full mt-2 p-4 bg-violet-900 justify-between max-w-3xl"
      >
        <p className="pl-2 text-white font-semibold text-2xl">Moenime.</p>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <Link
            href="/"
            className={clsx(
              "text-white hover:text-violet-200 transition-colors",
              {
                "font-bold underline underline-offset-4": pathname === "/",
              }
            )}
          >
            Home
          </Link>
          <Link
            href="/anime"
            className={clsx(
              "text-white hover:text-violet-200 transition-colors",
              {
                "font-bold underline underline-offset-4": pathname === "/anime",
              }
            )}
          >
            Anime
          </Link>
          <Link
            href="/about"
            className={clsx(
              "text-white hover:text-violet-200 transition-colors",
              {
                "font-bold underline underline-offset-4": pathname === "/about",
              }
            )}
          >
            About
          </Link>

          {/* Desktop Search */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center bg-white/20 rounded-full px-3 py-1"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-white/70 focus:outline-none w-32"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2"
            >
              <Search size={20} className="text-white" />
            </motion.button>
          </motion.form>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50"
      >
        <div className="flex items-center justify-between p-4 bg-violet-900">
          <p className="text-white font-semibold text-2xl">Moenime.</p>
          <motion.button
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            className="text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute top-full left-0 right-0 bg-violet-900 flex flex-col items-center py-4 space-y-4"
            >
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/"
                  className={clsx("text-white transition-colors", {
                    "font-bold underline underline-offset-4": pathname === "/",
                  })}
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/anime"
                  className={clsx("text-white transition-colors", {
                    "font-bold underline underline-offset-4":
                      pathname === "/anime",
                  })}
                  onClick={toggleMobileMenu}
                >
                  Anime
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/about"
                  className={clsx("text-white transition-colors", {
                    "font-bold underline underline-offset-4":
                      pathname === "/about",
                  })}
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
              </motion.div>

              {/* Mobile Search */}
              <motion.form
                onSubmit={handleSearchSubmit}
                variants={menuItemVariants}
                className="flex items-center bg-white/20 rounded-full px-3 py-1 w-10/12"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-white/70 focus:outline-none flex-grow"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-2"
                >
                  <Search size={20} className="text-white" />
                </motion.button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
