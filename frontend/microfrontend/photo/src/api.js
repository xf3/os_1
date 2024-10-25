import Api from "../../../src/utils/api";

export class PhotoApi extends Api {
  removeCard(cardID) {
    return this.request(`/cards/${cardID}`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardID, like) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`/cards/like/${cardID}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
