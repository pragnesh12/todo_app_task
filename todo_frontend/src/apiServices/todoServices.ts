import fetch from "../interceptor/fetchInterceptor";

const TodoServices: Record<any, any> = {};

// For InsertTodo END POINT
TodoServices.insertTodo = function (data: any): Promise<any> {
  return fetch({
    url: `/add-todo`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

// For InsertSubTodo END POINT
TodoServices.insertSubTodo = function (data: any): Promise<any> {
  return fetch({
    url: `/add-sub-todo`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

// FOR UpdateTodo END POINT
TodoServices.updateTodo = function (id: any, data: any): Promise<any> {
  return fetch({
    url: `/update-todo?id=${id}`,
    method: "put",

    headers: {
      "public-request": "true",
    },

    data: data,
  });
};

// FOR SubTodo END POINT
TodoServices.updateSubTodo = function (id: any, data: any): Promise<any> {
  const token = localStorage.getItem("auth");
  return fetch({
    url: `/update-sub-todo?id=${id}`,
    method: "put",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

// FOR FetchTodo END POINT
TodoServices.fetchTodo = async function (): Promise<any> {
  return fetch(`/fetch-todos`, {
    method: "GET",
    headers: {
      "public-request": "true",
    },
  })
    .then((response: any) => {
      return response;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

// FOR FetchTodo END POINT
TodoServices.fetchTodoById = async function (id: any): Promise<any> {
  return fetch(`/tasks?id=${id}`, {
    method: "GET",
    headers: {
      "public-request": "true",
    },
  })
    .then((response: any) => {
      return response;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

// FOR deleteTodo END POINT
TodoServices.deleteTodo = function (id: any): Promise<any> {
  return fetch({
    url: `/delete-todo?id=${id}`,
    method: "delete",
    headers: {
      "public-request": "true",
    },
  });
};

// FOR deleteSubTodo END POINT
TodoServices.deleteSubTodo = function (id: any): Promise<any> {
  return fetch({
    url: `/delete-sub-todo?id=${id}`,
    method: "delete",
    headers: {
      "public-request": "true",
    },
  });
};

export default TodoServices;
