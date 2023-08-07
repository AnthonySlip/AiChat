# AiChat - https://anthonyslip.github.io/aichat/

"AiChat" - это веб-приложение, которое представляет из себя чат-бота Openai Chat GPT.
"AiChat" написан на библиотеке ReactJS (собран на Vite). Приложение строится на Openai API, для этого был написан небольшой backend (подробнее: https://github.com/AnthonySlip/aichat-server).
Также в приложении присутствует авторизация по jwt-токенам (access и refresh), кроме того я реализовал верификацию почты пользователя через backend: на указанную пользователем почту приходит код, который необходимо ввести в приложении, чтобы пользоваться чат-ботом.

Приложение используются следующие библиотеке (frontend):
- Axios (для автоматического определения access-токена в заголовках запроса)
- React-router-dom (для навигации spa-приложения)
- React-hook-form (для удобной валидации форм)
- Vite-plugin-svgr (для удобства импорта файлов .svg)
- Zustand (отвечает за состояние приложения)


"AiChat" is a web application that is an Openai Chat GPT chatbot.
"AiChat" is written in ReactJS library (built on Vite). The application is built on the Openai API, a small backend was written for this (more details: https://github.com/AnthonySlip/aichat-server).
Also, the application has authorization by jwt tokens (access and refresh), in addition, I implemented verification of the user's mail through the backend: a code is sent to the mail specified by the user, which must be entered in the application in order to use the chat bot.

The application uses the following library (frontend):
- Axios (to automatically determine the access token in the request headers)
- React-router-dom (for spa app navigation)
- React-hook-form (for convenient form validation)
- Vite-plugin-svgr (for ease of importing .svg files)
- Zustand (responsible for the state of the application)
