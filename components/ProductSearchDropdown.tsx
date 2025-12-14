'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Product } from '@/types';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import transformProducts from '@/lib/fuzzy-search/transformProducts';
import { createFuseInstance } from '@/lib/fuzzy-search/createFuseInstance';


interface ProductSearchDropdownProps {
  products: Product[];
  locale: string;
}

export default function ProductSearchDropdown({ products, locale }: ProductSearchDropdownProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const transformedProducts = transformProducts(products);
  const fuse = createFuseInstance(transformedProducts);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return fuse.search(query)
  }, [searchQuery, fuse]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(searchQuery.trim().length > 0 && filteredProducts.length > 0);
  }, [searchQuery, filteredProducts.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => 
        prev < filteredProducts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      const product = filteredProducts[focusedIndex];
      window.location.href = `/${locale}/${product.item.id}`;
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={searchRef}
      style={{
        position: 'relative',
        marginBottom: '2rem',
        maxWidth: '600px',
      }}
    >
      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <Search
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666',
            width: '20px',
            height: '20px',
            pointerEvents: 'none',
          }}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products by title, description, category, or ID..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setFocusedIndex(-1);
          }}
          onFocus={() => {
            if (searchQuery.trim().length > 0 && filteredProducts.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            padding: '12px 40px 12px 40px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ddd';
            e.target.style.boxShadow = 'none';
          }}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#666',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && filteredProducts.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          {filteredProducts.map((product, index) => (
            <Link
              key={product.item.id}
              href={`/${locale}/${product.item.id}`}
              style={{
                display: 'block',
                padding: '12px 16px',
                textDecoration: 'none',
                color: '#333',
                borderBottom: index < filteredProducts.length - 1 ? '1px solid #eee' : 'none',
                backgroundColor: focusedIndex === index ? '#f5f5f5' : 'transparent',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={() => setFocusedIndex(index)}
              onMouseLeave={() => setFocusedIndex(-1)}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                {product.item.title}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#666',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {product.item.description}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#999',
                  marginTop: '4px',
                }}
              >
                ID: {product.item.id} • {product.item.category}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {searchQuery.trim().length > 0 && filteredProducts.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            color: '#666',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          No products found matching {searchQuery}
        </div>
      )}
    </div>
  );
}
