class StorageService {
  constructor() {
    this.userId = null;
  }

  setUserId(id) {
    this.userId = id;
  }

  // Сохранение списков в localStorage (в реальном приложении - API)
  saveWishlists(wishlists) {
    localStorage.setItem(`wishlists_${this.userId}`, JSON.stringify(wishlists));
  }

  getWishlists() {
    const data = localStorage.getItem(`wishlists_${this.userId}`);
    return data ? JSON.parse(data) : [];
  }

  // Сохранение общих списков (для просмотра друзьями)
  savePublicWishlist(wishlist) {
    const publicLists = this.getPublicWishlists();
    const existingIndex = publicLists.findIndex(w => w.id === wishlist.id);
    
    if (existingIndex >= 0) {
      publicLists[existingIndex] = wishlist;
    } else {
      publicLists.push(wishlist);
    }
    
    localStorage.setItem('public_wishlists', JSON.stringify(publicLists));
  }

  getPublicWishlists() {
    const data = localStorage.getItem('public_wishlists');
    return data ? JSON.parse(data) : [];
  }

  getWishlistById(id) {
    const publicLists = this.getPublicWishlists();
    return publicLists.find(w => w.id === id);
  }
}

export default new StorageService();