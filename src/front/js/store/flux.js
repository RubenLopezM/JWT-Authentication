import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      baseUrl:
        "https://3001-4geeksacademy-reactflask-70h2suyshjh.ws-eu29.gitpod.io/api/",
    },
    actions: {
      // Use getActions to call a function within a fuction
      register: async (data) => {
        const opt = {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(data),
        };

        try {
          const resp = await fetch(getStore().baseUrl.concat("user"), opt);
          if (resp.status !== 200) {
            // alert("There has been some error");
            return false;
          }
          const data = await resp.json();
        } catch (error) {
          console.error("There was an error!!", error);
        }
      },
      login: async (data) => {
        const opts = {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(data),
        };

        try {
          const resp = await fetch(getStore().baseUrl.concat("login"), opts);
          if (resp.status !== 200) {
            // alert("There has been some error");
          }

          const data = await resp.json();
          console.log("this came from the backend", data);

          sessionStorage.setItem("token", data.token);
          const tokenDecoded = jwt_decode(data.token);
        } catch (error) {
          console.error("There was an error!!", error);
        }
      },
    },
  };
};

export default getState;
