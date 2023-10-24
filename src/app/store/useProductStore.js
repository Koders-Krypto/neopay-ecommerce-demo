import create from "zustand";

const useProductStore = create((set) => ({
  products: [],
  addProduct: (newProduct) => {
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },
  deleteProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
  },
  updateProduct: (updatedProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    }));
  },
}));

export default useProductStore;
