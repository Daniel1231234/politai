<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>politai
</h1>
<h3>◦ Empowering Democracy with AI</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/SVG-FFB13B.svg?style&logo=SVG&logoColor=black" alt="SVG" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style&logo=Axios&logoColor=white" alt="Axios" />

<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style&logo=MongoDB&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/OpenAI-412991.svg?style&logo=OpenAI&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Pusher-300D4F.svg?style&logo=Pusher&logoColor=white" alt="Pusher" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
</p>
<img src="https://img.shields.io/github/languages/top/Daniel1231234/politai?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/Daniel1231234/politai?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/Daniel1231234/politai?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/license/Daniel1231234/politai?style&color=5D6D7E" alt="GitHub license" />
</div>

---

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#-modules)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Installation](#-installation)
  - [🤖 Running politai](#-running-politai)
- [🤝 Contributing](#-contributing)

---

## 📍 Overview

Politai aims to revolutionize the way we engage in democratic processes by integrating advanced AI technologies. Developed with a rich set of features including real-time chat, social feeds, and secure authentication, it provides an interactive platform for users to express their opinions, connect with others, and engage in meaningful conversations. By embracing modern tech stacks like Next.js, TypeScript, and various third-party APIs, Politai not only stands as a complex piece of software but also as a step forward in civic engagement platforms.

---

## 📦 Features

1. **🗨 Real-Time Chat**: Leveraging WebSockets, politai delivers instant messaging to keep conversations fluid.
2. **🔒 User Authentication**: Implementing OAuth2.0 and JWT, we ensure that your information is secure.
3. **📣 Social Feed**: Express yourself, comment, and interact in a real-time feed to foster a community atmosphere.
4. **👤 Profile Management**: Your profile, your rules. Update and manage your user information easily.
5. **👫 Friend Management**: Send, receive, and manage friend requests for a personalized social experience.
6. **🎙 STT (Speech-To-Text)**: Convert spoken content into written transcriptions effortlessly.

---

## 📂 Repository Structure

<details closed><summary>Click to expand!</summary>

```sh
└── politai/
    ├── .eslintrc.json
    ├── .gitignore
    ├── README.md
    ├── next.config.js
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public/
    │   ├── images/
    │   │   ├── hero.png
    │   │   └── placeholder.jpg
    │   ├── next.svg
    │   └── vercel.svg
    ├── src/
    │   ├── actions/
    │   │   └── index.ts
    │   ├── app/
    │   │   ├── (admin)/
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   └── layout.tsx
    │   │   ├── (guest)/
    │   │   │   ├── auth/
    │   │   │   │   └── page.tsx
    │   │   │   └── layout.tsx
    │   │   ├── (private)/
    │   │   │   ├── chat/
    │   │   │   │   ├── [chatId]/
    │   │   │   │   │   ├── loading.tsx
    │   │   │   │   │   └── page.tsx
    │   │   │   │   ├── loading.tsx
    │   │   │   │   └── page.tsx
    │   │   │   ├── feed/
    │   │   │   │   ├── loading.tsx
    │   │   │   │   └── page.tsx
    │   │   │   ├── layout.tsx
    │   │   │   ├── profile/
    │   │   │   │   └── [userId]/
    │   │   │   │       ├── loading.tsx
    │   │   │   │       └── page.tsx
    │   │   │   └── stt/
    │   │   │       ├── loading.tsx
    │   │   │       └── page.tsx
    │   │   ├── api/
    │   │   │   ├── auth/
    │   │   │   │   ├── [...nextauth]/
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── users/
    │   │   │   │       └── route.ts
    │   │   │   ├── chat/
    │   │   │   │   ├── message/
    │   │   │   │   │   └── send/
    │   │   │   │   │       └── route.ts
    │   │   │   │   └── route.ts
    │   │   │   ├── friends/
    │   │   │   │   ├── [action]/
    │   │   │   │   │   └── route.ts
    │   │   │   │   ├── add/
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── remove/
    │   │   │   │       └── [friendId]/
    │   │   │   │           └── route.ts
    │   │   │   └── opinion/
    │   │   │       ├── comment/
    │   │   │       │   └── [opinionId]/
    │   │   │       │       └── route.ts
    │   │   │       └── route.ts
    │   │   ├── favicon.ico
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   ├── AddFriendButton.tsx
    │   │   ├── AddOpinionModal.tsx
    │   │   ├── AppFooter.tsx
    │   │   ├── AppLogo.tsx
    │   │   ├── AuthProvider.tsx
    │   │   ├── Button.tsx
    │   │   ├── ChatInput.tsx
    │   │   ├── ContextMenu.tsx
    │   │   ├── Divider.tsx
    │   │   ├── EmojiPick.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── FeedHeader.tsx
    │   │   ├── FriendRequestPreviewModal.tsx
    │   │   ├── GoogleSignin.tsx
    │   │   ├── ImgContainer.tsx
    │   │   ├── Input.tsx
    │   │   ├── ManageChat.tsx
    │   │   ├── MenuDropdown.tsx
    │   │   ├── Messages.tsx
    │   │   ├── MobileFeedLayout.tsx
    │   │   ├── NewOpinionInput.tsx
    │   │   ├── OpinionList.tsx
    │   │   ├── OpinionPreview.tsx
    │   │   ├── ProfileHeader.tsx
    │   │   ├── Providers.tsx
    │   │   ├── RemoveChatBtn.tsx
    │   │   ├── SidebarChatList.tsx
    │   │   ├── SignoutButton.tsx
    │   │   ├── Stt.tsx
    │   │   ├── UpdateProfile.tsx
    │   │   └── profile-cmps/
    │   │       ├── About.tsx
    │   │       ├── Friends.tsx
    │   │       ├── OpinionItem.tsx
    │   │       ├── Opinions.tsx
    │   │       └── ProfileContent.tsx
    │   ├── constants/
    │   │   └── index.ts
    │   ├── hooks/
    │   │   ├── useFriendRequests.ts
    │   │   ├── useOnClickOutside.ts
    │   │   └── useScrollPosition.ts
    │   ├── lib/
    │   │   ├── aws.ts
    │   │   ├── mongodb.ts
    │   │   ├── pusher.ts
    │   │   └── utils.ts
    │   ├── models/
    │   │   ├── chat.ts
    │   │   ├── comment.ts
    │   │   ├── index.ts
    │   │   ├── like.ts
    │   │   ├── opinion.ts
    │   │   └── user.ts
    │   └── types/
    │       └── index.d.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```

</details>

---

## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [next.config.js](https://github.com/Daniel1231234/politai/blob/main/next.config.js)         | The code in next.config.js sets up the configuration for a Next.js project. It specifies the allowed domains for images, including cloud storage providers and image hosting services. It also enables the experimental serverActions feature.                                                                                     |
| [tailwind.config.ts](https://github.com/Daniel1231234/politai/blob/main/tailwind.config.ts) | The code is a Tailwind CSS configuration file (tailwind.config.ts). It defines the content to be processed by Tailwind CSS (source files). It extends the theme with additional colors, background images, and grid template columns. It also specifies container settings for centering and padding, and adds a plugin for forms. |
| [postcss.config.js](https://github.com/Daniel1231234/politai/blob/main/postcss.config.js)   | The code is a configuration file for PostCSS, a tool for transforming CSS with JavaScript plugins. It specifies two plugins: Tailwind CSS to customize and optimize CSS, and autoprefixer to add browser-specific prefixes to CSS properties.                                                                                      |

</details>

<details closed><summary>Constants</summary>

| File                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/Daniel1231234/politai/blob/main/src/constants/index.ts) | The code defines constants such as sidebar options, avatar image path, political types, and initial topics. The sidebar options include names, links, and icons for navigation. The political type enum represents different political affiliations. The getInitialTopics function returns an array of topic objects with values and labels. |

</details>

<details closed><summary>Models</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [chat.ts](https://github.com/Daniel1231234/politai/blob/main/src/models/chat.ts)       | The code defines a schema and model for a chat conversation in a messaging system. It includes fields for chat ID, messages, and users. The Mongoose library is used to define and retrieve the data from a MongoDB database. The code exports the Chat model for use in other parts of the application.                                                                                                         |
| [user.ts](https://github.com/Daniel1231234/politai/blob/main/src/models/user.ts)       | This code defines the user schema and model for a MongoDB database using Mongoose. It includes fields for email, password, name, active status, phone, image, birthday, gender, opinions, chats, ideology, religion, friends, friend requests, createdAt timestamp, and role. It also includes methods for password comparison and password encryption.                                                          |
| [like.ts](https://github.com/Daniel1231234/politai/blob/main/src/models/like.ts)       | The code defines a Mongoose model for a "Like" object, including the creator, opinion, and creation timestamp properties. It exports the model for use in other parts of the application.                                                                                                                                                                                                                        |
| [index.ts](https://github.com/Daniel1231234/politai/blob/main/src/models/index.ts)     | The code in the "models" directory imports and configures various modules related to the user, comment, opinion, chat, and like functionalities for this system.                                                                                                                                                                                                                                                 |
| [comment.ts](https://github.com/Daniel1231234/politai/blob/main/src/models/comment.ts) | This code defines a Comment model for a MongoDB database using Mongoose. It includes fields for text, creator, opinion, likes, dislikes, and createdAt. The model is exported for use in other parts of the codebase.                                                                                                                                                                                            |
| [opinion.ts](https://github.com/Daniel1231234/politai/blob/main/src/models/opinion.ts) | The code defines a Mongoose schema and model for an "Opinion" document, which represents user opinions in a system. It includes fields such as title, body, images, topics, creator, comments, likes, dislikes, and createdAt. The model is exported and can be used to create, retrieve, update, or delete opinion documents. The code also includes an interface for creating an opinion with specific fields. |

</details>

<details closed><summary>Actions</summary>

| File                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/Daniel1231234/politai/blob/main/src/actions/index.ts) | The code provides a set of functions for retrieving and manipulating data related to users, chats, opinions, likes, and friend requests. It connects to a MongoDB database, retrieves and updates data using Mongoose models, and handles error cases. The functions involve tasks such as fetching user details, retrieving user chats, getting opinions with their associated data, managing likes, and handling chat messages. |

</details>

<details closed><summary>Lib</summary>

| File                                                                              | Summary                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [db.ts](https://github.com/Daniel1231234/politai/blob/main/src/lib/db.ts)         | The code connects to MongoDB using Mongoose and provides a function to establish a connection. It utilizes a global object to cache the connection and ensures only one connection is established.                                                                                |
| [aws.ts](https://github.com/Daniel1231234/politai/blob/main/src/lib/aws.ts)       | This code establishes a connection to the Amazon S3 service. It creates a bucket and uploads an object to the bucket using provided parameters. The code includes error handling and logging for debugging purposes.                                                              |
| [utils.ts](https://github.com/Daniel1231234/politai/blob/main/src/lib/utils.ts)   | The code in `utils.ts` provides various utility functions. These functions include merging CSS class names, converting keys for Pusher, constructing hyperlinks, formatting distance between dates, formatting dates, generating random IDs, and getting an empty opinion object. |
| [pusher.ts](https://github.com/Daniel1231234/politai/blob/main/src/lib/pusher.ts) | The code defines and exports two Pusher instances: pusherServer, for server-side use, and pusherClient, for client-side use. It initializes both instances with the Pusher app ID, key, secret, cluster, and TLS settings.                                                        |
|  |

</details>

<details closed><summary>Types</summary>

| File                                                                                  | Summary                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.d.ts](https://github.com/Daniel1231234/politai/blob/main/src/types/index.d.ts) | This code defines interfaces for various entities like friend request, like, opinion, comment, chat, and message. It also extends the existing user and session interfaces from the next-auth module. |

</details>

<details closed><summary>Hooks</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [useScrollPosition.ts](https://github.com/Daniel1231234/politai/blob/main/src/hooks/useScrollPosition.ts) | The code is a custom React hook called useScrollPosition. It is used to track and retrieve the current scroll position on a web page. The hook utilizes the useState and useEffect hooks from React to set up a listener for the scroll event and update the scroll position state. It returns the current scroll position.                                             |
| [useOnClickOutside.ts](https://github.com/Daniel1231234/politai/blob/main/src/hooks/useOnClickOutside.ts) | This code implements a custom hook called useOnClickOutside, which listens for clicks or touches outside a specified element. It takes in a ref to track the element and a callback handler to be executed when a click or touch event occurs outside the element. This hook adds event listeners for mousedown and touchstart events, and removes them when unmounted. |
| [useFriendRequests.ts](https://github.com/Daniel1231234/politai/blob/main/src/hooks/useFriendRequests.ts) | The code defines a hook called useFriendRequests. It creates a state management system using the Zustand library, where users can manage a list of friend requests. The state consists of an array of FriendRequest objects, and provides functions to set the requests, add new requests, and remove requests by sender ID.                                            |

</details>

<details closed><summary>App</summary>

| File                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [page.tsx](https://github.com/Daniel1231234/politai/blob/main/src/app/page.tsx)       | The code defines the functionality of the home page in a web application. It fetches the server session, checks if it exists, and redirects the user if necessary. The page includes a header with a logo and a "Sign In" link. It also displays a heading, description, and a link to explore the platform. The page contains an image as well. |
| [layout.tsx](https://github.com/Daniel1231234/politai/blob/main/src/app/layout.tsx)   | This code is the root layout component of an application. It includes an authentication provider and renders the children components within a HTML body. The Providers component allows for additional providers to be added. The metadata object defines the title and description for the application.                                         |
| [globals.css](https://github.com/Daniel1231234/politai/blob/main/src/app/globals.css) | This code is a CSS file that defines the global styles for the application. It includes Tailwind CSS configuration and sets the base container width, scroll bar styles, and padding/margin for an emoji picker component. It also hides certain elements related to emoji categories.                                                           |

</details>

<details closed><summary>(guest)</summary>

| File                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [layout.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(guest)/layout.tsx>) | The code defines a component called GuestLayout that serves as a layout for guests in a web application. It imports the getServerSession function from the next-auth package to check the user's session. If the session exists, the code redirects the user to the "/feed" route. The layout renders a section element with a specific background class and renders the children within it. |

</details>

<details closed><summary>Auth</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(guest)/auth/page.tsx>) | This code defines the functionality of an authentication page in a React application. It handles user authentication, registration, and login using credentials or Google sign-in. Form input is validated using React Hook Form. The code also makes use of Next.js router and Axios for HTTP requests. |

</details>

<details closed><summary>(admin)</summary>

| File                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [layout.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(admin)/layout.tsx>) | The code in `layout.tsx` defines the `AdminLayout` component, which expects a `children` prop. It uses `getServerSession()` to retrieve the user session and checks if the user's role is "admin". If not, it redirects to the "/auth" page. The component wraps the children in a `<section>` element with the CSS class "bg-light-1". The exported `AdminLayout` can be used as a layout component for admin-related pages. |

</details>

<details closed><summary>Dashboard</summary>

| File                                                                                                | Summary                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(admin)/dashboard/page.tsx>) | The code in the file `page.tsx` is a React functional component that defines the DashboardPage. It takes no props as input and returns a div element with the class name "DashboardPage" displaying the text "DashboardPage". This component can be used to render the dashboard page in a React application. |

</details>

<details closed><summary>(private)</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [layout.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/layout.tsx>) | The `FeedLayout` component is responsible for rendering the layout of a feed page. It authenticates the user session, retrieves friend requests and chats related to the user, and renders a sidebar navigation with various links and components. The main content is displayed in the main area of the layout. |

</details>

<details closed><summary>Feed</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/feed/page.tsx>)       | The code in this file is responsible for rendering the feed page of a web application. It uses various components, actions, and APIs to fetch initial opinions, retrieve user friends, and authenticate user sessions. If the session is not available, the user is redirected to the authentication page. The page then displays a new opinion input, a divider, and a list of opinions based on the user session. |
| [loading.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/feed/loading.tsx>) | The code in src/app/(private)/feed/loading.tsx exports a React component called "loading" that displays a loading skeleton UI. It uses the Skeleton component from the react-loading-skeleton library to render placeholders with specified dimensions. The component is wrapped in a div container and uses CSS classes for styling.                                                                               |

</details>

<details closed><summary>Stt</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/stt/page.tsx>)       | The code defines a SpeechToText component that renders the Stt component. It is a React functional component without any specified props.                                                                                                                                                                                                                                                                        |
| [loading.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/stt/loading.tsx>) | The code in `loading.tsx` exports a React component called `loading`. It renders a loading skeleton UI with customizable dimensions using the Skeleton component from the react-loading-skeleton library. The component accepts no props and returns a div container with three skeletons of different sizes. The loading component is intended to be used for visualizing loading states in the user interface. |

</details>

<details closed><summary>Chat</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/chat/page.tsx>)       | This code represents the functionality of the chat page in an application. It retrieves the user's session and redirects if the session doesn't exist. It then fetches the user's chat data and displays either an empty state or the chat management component based on the availability of chats.                         |
| [loading.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/chat/loading.tsx>) | This code defines a React FC component called "loading" that displays skeleton loading animations. It renders a container with three Skeleton components representing loading placeholders for different UI elements.                                                                                                       |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/chat/route.ts)               | This code is a server route for handling a POST request to create a chat. It connects to a MongoDB database, retrieves the authenticated user's session, and creates a chat or updates an existing one with the given chatId and friend details. It also updates the user's chat list and returns the created/updated chat. |

</details>

<details closed><summary>[chatid]</summary>

| File                                                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/chat/[chatId]/page.tsx>)       | This code is for a private chat page in a chat application. It retrieves the chat and chat partner information based on the chat ID. The page displays the chat partner's profile picture, name, and email. It also renders the chat messages and provides an input for the user to send new messages.                                                                                                                                                        |
| [loading.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/chat/[chatId]/loading.tsx>) | The `loading.tsx` file is a React component that renders a loading skeleton for a chat interface. It includes placeholders for chat messages with a mixture of styled components and the `Skeleton` component from the "react-loading-skeleton" library. The skeleton provides a visual representation of the chat UI while data is being fetched or loaded. This component helps to enhance user experience by giving them a sense of progress and activity. |

</details>

<details closed><summary>[userid]</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/profile/[userId]/page.tsx>)       | The code is a React component that renders a user profile page. It retrieves user information, opinions, and friends using various API calls. It also checks if the logged-in user is viewing their own profile and handles friend requests accordingly. The rendered components include a profile header, content, and an add friend button. |
| [loading.tsx](<https://github.com/Daniel1231234/politai/blob/main/src/app/(private)/profile/[userId]/loading.tsx>) | The code provides a loading skeleton component for displaying a loading state in a user's profile. It uses the React framework and renders a set of Skeleton components to represent the loading state of various elements in the profile. The loading skeleton component is customizable with different dimensions and styling.              |

</details>

<details closed><summary>Opinion</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/opinion/route.ts) | The code defines a POST function for creating a new opinion. It uses Next.js authentication to check if the user is authorized. It connects to a MongoDB database and creates a new opinion document based on the request's JSON payload. It also updates the user's opinions array with the new opinion ID. Finally, it returns a JSON response with the success status and the new opinion or an error message if any. |

</details>

<details closed><summary>[opinionid]</summary>

| File                                                                                                            | Summary                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/opinion/comment/[opinionId]/route.ts) | This code handles the creation and deletion of comments for a given opinion. It ensures the user is authenticated before proceeding. It leverages a MongoDB database for data storage and uses Pusher for real-time updates. If successful, it returns a JSON response with the appropriate status. |

</details>

<details closed><summary>Users</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/auth/users/route.ts) | This code defines a POST API route for user creation. It receives user data in the request body, checks if the email is already in use, saves the user to a MongoDB database, and returns a response with the created user's details. It handles error cases as well. |

</details>

<details closed><summary>[...nextauth]</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/auth/[...nextauth]/route.ts) | This code defines the authentication options for the NextAuth framework. It handles authentication using Google and custom credentials providers, validates credentials, assigns roles, and manages sessions. |

</details>

<details closed><summary>Send</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/chat/message/send/route.ts) | The code defines two functions: POST and DELETE. The POST function sends a chat message by connecting to MongoDB, authenticating the user, and saving the message in the database. It also triggers a push notification to the chat room using Pusher. The DELETE function connects to MongoDB, authenticates the user, and retrieves the chat ID to delete the corresponding chat. |

</details>

<details closed><summary>[action]</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/friends/[action]/route.ts) | This code handles the HTTP POST request for accepting or denying friend requests. It verifies the user's session, connects to the database, and updates the user's friend requests and friends lists accordingly. It returns a JSON response indicating the success or failure of the operation. |

</details>

<details closed><summary>[friendid]</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/friends/remove/[friendId]/route.ts) | This code is for handling the deletion of a friend from a user's friend list. It uses Next.js server functions and NextAuth for authentication. The code checks if the user is authenticated, connects to MongoDB, finds the friend by their ID, updates both the user and friend's friend lists, and returns a success message or error. |

</details>

<details closed><summary>Add</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/Daniel1231234/politai/blob/main/src/app/api/friends/add/route.ts) | The code is a server route that handles the creation of friend requests in a social networking application. It first authenticates the user, then connects to the MongoDB database. It checks if a friend request from the session user already exists and returns an error if it does. If not, it creates a new friend request, adds it to the receiver's profile, and returns a success response. |

</details>

<details closed><summary>Components</summary>

| File                                                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Divider.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/Divider.tsx)                                     | The code in this component, "Divider.tsx", is responsible for rendering a horizontal divider in a React application. It is a functional component that takes an optional className as a prop and returns a div element with the given className. The div element has a width of 100%, a border of gray color, and any additional class provided through the prop.                                                                                                                                                                                                                                                                    |
| [AppFooter.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/AppFooter.tsx)                                 | This code is for the AppFooter component of a web application. It displays a footer at the bottom of the app, except on the chat and speech-to-text pages. The footer includes information about the app's creator, a link to their website, and a link to their GitHub profile. It is implemented using React and Next.js.                                                                                                                                                                                                                                                                                                          |
| [MobileFeedLayout.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/MobileFeedLayout.tsx)                   | The code in this file, MobileFeedLayout.tsx, defines a React component that represents a mobile feed layout. It consists of a header with a logo, a bell icon for notifications, and a menu button. The menu button opens a side panel with links for user navigation, including profile, feed, chat, speech to text, and sign out. The component also has a footer with additional content, and it supports handling friend requests with a modal for previewing and accepting/denying requests.                                                                                                                                    |
| [GoogleSignin.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/GoogleSignin.tsx)                           | The code exports a React component called GoogleSignin. It renders a button that allows users to sign in with Google. The component receives two props: loginWithGoogle, a function that handles the sign-in process, and isLoading, a boolean indicating whether the sign-in process is currently loading. The button is styled using CSS classes and contains the text "Sign in with Google" and the Google icon.                                                                                                                                                                                                                  |
| [Input.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/Input.tsx)                                         | The code is for an input component in a React application that handles form inputs. It takes in various props such as label, id, type, register, required, errors, and disabled. It renders an input element with appropriate styling and validation. The component is exported for external use.                                                                                                                                                                                                                                                                                                                                    |
| [AuthProvider.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/AuthProvider.tsx)                           | The provided code is a React component called AuthProvider that wraps the children components. It imports React, the SessionProvider from next-auth/react, and the Toaster component from react-hot-toast. The AuthProvider component accepts children as props and renders the SessionProvider component, which includes the children components. This component facilitates session management and authentication within the application.                                                                                                                                                                                          |
| [AppLogo.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/AppLogo.tsx)                                     | The code defines a functional React component called AppLogo. It renders a logo consisting of a text "Politai" with a globe icon and the text "Social". The component accepts an optional className prop for additional styling.                                                                                                                                                                                                                                                                                                                                                                                                     |
| [Button.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/Button.tsx)                                       | The code exports a React component called "Button" that allows for customization of its appearance through different variants and sizes. It supports an optional loading state and renders a button element with the specified variant, size, and loading indicator if necessary. The component utilizes utility functions and icons from external libraries.                                                                                                                                                                                                                                                                        |
| [SidebarChatList.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/SidebarChatList.tsx)                     | The code defines the SidebarChatList component, which renders a list of chats in a sidebar menu. It displays the chat name, the number of unseen messages, and allows navigation to individual chat pages. The component manages the state of unseen messages and handles the opening and closing of the submenu.                                                                                                                                                                                                                                                                                                                    |
| [UpdateProfile.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/UpdateProfile.tsx)                         | The code defines a React component called UpdateProfile. It renders a form with inputs for email address, full name, country (commented out), political types (commented out), and ideology (textarea). It also includes a "Save Changes" button.                                                                                                                                                                                                                                                                                                                                                                                    |
| [OpinionPreview.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/OpinionPreview.tsx)                       | The code in the "OpinionPreview.tsx" file is a React component that represents a preview of a user's opinion. It allows users to like the opinion, comment on it, view comments, delete comments, and add friends. It utilizes various hooks and libraries such as Next.js and Pusher for real-time updates. The component also handles API requests to perform actions like adding a friend, adding a like, and adding a comment. Overall, it provides an interactive and dynamic interface for users to interact with opinions.                                                                                                    |
| [ManageChat.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/ManageChat.tsx)                               | The code defines a React component called "ManageChat" that displays a list of recent chats. It takes in an array of user chats and a session ID as props. Each chat is rendered with the friend's name and profile picture. Links are provided to navigate to individual chats, and there is an option to remove chats. The component is styled using tailwind CSS.                                                                                                                                                                                                                                                                 |
| [MenuDropdown.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/MenuDropdown.tsx)                           | The code in MenuDropdown.tsx is a React component that represents a menu dropdown for a user. It displays the user's profile image and provides options for viewing friend requests and signing out. It also handles friend request actions and provides a modal for previewing and responding to friend requests.                                                                                                                                                                                                                                                                                                                   |
| [AddOpinionModal.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/AddOpinionModal.tsx)                     | The code in this file, "AddOpinionModal.tsx", defines a React component called "AddOpinionModal". It is a modal dialog that allows users to create a new opinion. The modal contains input fields for the opinion's title and body, as well as a file upload button for attaching images. Users can also select multiple topics for the opinion from a dropdown menu. When the user submits the form, the opinion is sent to a server-side API endpoint using Axios, and upon successful submission, a success toast notification is displayed. Overall, this component provides a user interface for creating and posting opinions. |
| [NewOpinionInput.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/NewOpinionInput.tsx)                     | The code defines a React component called NewOpinionInput. It renders a form input for users to share their opinion. The component takes a user object as a prop and displays the user's profile image and name. When the user clicks on the input, it opens a modal form called AddOpinionModal. The component manages the state for the modal being open or closed.                                                                                                                                                                                                                                                                |
| [ProfileHeader.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/ProfileHeader.tsx)                         | The code defines a React component called ProfileHeader. It displays a user's profile information, including their image, name, number of friends, and join date. The component receives the user object and a boolean indicating if it's the user's own profile. It uses various Next.js and React libraries for functionality and styling.                                                                                                                                                                                                                                                                                         |
| [FriendRequestPreviewModal.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/FriendRequestPreviewModal.tsx) | The code defines a React functional component called FriendRequestPreviewModal. It is a modal component that renders a dialog box displaying friend requests. Users can approve or deny the requests using buttons. The component receives props including the friend requests data and functions for handling the requests.                                                                                                                                                                                                                                                                                                         |
| [SignoutButton.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/SignoutButton.tsx)                         | The code defines a React component called SignoutButton that triggers a sign out process when clicked. It imports the "signOut" function from the "next-auth/react" package and uses it to sign out the user. The sign out is initiated by a button click event, and it redirects to the callbackUrl provided. If there is an error, it logs a message to the console.                                                                                                                                                                                                                                                               |
| [OpinionList.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/OpinionList.tsx)                             | The code defines a React component called OpinionList, which receives a user object as a prop. It fetches initial opinions and user friends' data asynchronously. It renders the list of opinions and determines if each opinion belongs to a friend or the user. It also renders an empty state message if there are no opinions.                                                                                                                                                                                                                                                                                                   |
| [ImgContainer.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/ImgContainer.tsx)                           | The code in ImgContainer.tsx exports a React component called ImgContainer, which takes a prop called publicId. It renders a CldImage component from the "next-cloudinary" package, displaying an image with the provided publicId as its source. The image has a width and height of 300 pixels and fills the background.                                                                                                                                                                                                                                                                                                           |
| [FeedHeader.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/FeedHeader.tsx)                               | The code represents a functional component called FeedHeader in React. It renders a header section containing a search bar, an app logo, and a menu dropdown. It receives user and friendRequests as props. The search bar allows users to search for content, while the menu dropdown displays user information and pending friend requests.                                                                                                                                                                                                                                                                                        |
| [ChatInput.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/ChatInput.tsx)                                 | The code in "ChatInput.tsx" file is a React component that serves as an input field for sending messages in a chat application. It includes features like sending text messages, uploading images, using speech-to-text for input, and selecting emojis. The component uses various libraries and APIs such as Next.js, Cloudinary, react-speech-recognition, and react-icons. The code also implements event handling and API requests for sending messages and uploading images.                                                                                                                                                   |
| [RemoveChatBtn.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/RemoveChatBtn.tsx)                         | The code provides a React component called "RemoveChatBtn" that renders a button with a trash icon. When the button is clicked, it calls the "deleteChat" function to delete a chat identified by the provided chatId. If the deletion is successful, a success toast message is shown. Finally, the router is refreshed to update the UI.                                                                                                                                                                                                                                                                                           |
| [Providers.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/Providers.tsx)                                 | The code exports a React component called Providers, meant to wrap other components as a provider. It renders a Toast notification component from the react-hot-toast library in a fixed position at the top-center. It then renders the children components as its direct child elements.                                                                                                                                                                                                                                                                                                                                           |
| [AddFriendButton.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/AddFriendButton.tsx)                     | This code is a React component that renders an "Add Friend" button. When the button is clicked, it sends a POST request to the server to add a friend request. The component handles loading and error states, and displays a success toast message upon successful request. It also disables the button if a friend request has already been sent.                                                                                                                                                                                                                                                                                  |
| [ContextMenu.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/ContextMenu.tsx)                             | The code defines a React component called ContextMenu that creates a customizable context menu. It handles click events and displays a menu with options such as copy and remove. The menu can be disabled, show separators, and have nested submenus.                                                                                                                                                                                                                                                                                                                                                                               |
| [Messages.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/Messages.tsx)                                   | The code in the "Messages.tsx" file implements a React component for rendering chat messages. It receives an array of chat messages, the chat partner's ID, the current user's data, and the chat ID as props. The component uses the Pusher client to subscribe to real-time updates for the chat. It handles adding and removing messages based on events received from Pusher. The component also supports a context menu with options for copying message content and removing messages. The messages are rendered with appropriate styling based on the sender and content type.                                                |
| [EmojiPick.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/EmojiPick.tsx)                                 | The code is a TypeScript component in a Next.js application that dynamically imports a emoji-picker-react package using the "next/dynamic" module. It disables server-side rendering (ssr: false) for this component. Ultimately, the code exports the dynamically imported Picker component.                                                                                                                                                                                                                                                                                                                                        |
| [EmptyState.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/EmptyState.tsx)                               | The code defines a React component called EmptyState. It takes in props like title, description, buttonLabel, and onButtonClick, and renders a div with these values. It also conditionally renders a Button component if the onButtonClick prop is provided. Overall, it creates a styled empty state UI with customizable text and an optional button.                                                                                                                                                                                                                                                                             |
| [Stt.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/Stt.tsx)                                             | This code is a React component that provides speech-to-text functionality. It utilizes the react-speech-recognition library to handle speech recognition. The component displays the transcribed text and allows the user to start and stop listening to speech input using buttons. The transcribed text can also be copied to the clipboard.                                                                                                                                                                                                                                                                                       |

</details>

<details closed><summary>Profile-cmps</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ProfileContent.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/profile-cmps/ProfileContent.tsx) | This code represents the ProfileContent component responsible for displaying different sections (opinions, about, friends) on a profile page. It utilizes React's useState hook to manage the selected section. The component renders buttons for each section and updates the content based on the selected variant. The variant is controlled by the "variant" state and determines which component (Opinions, About, Friends) is displayed.                  |
| [OpinionItem.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/profile-cmps/OpinionItem.tsx)       | The code defines a React functional component called OpinionItem that renders a card-like structure displaying an opinion item. It includes the item's creator information, image, creation date, body text, and associated topics. It also has an interactive heart icon. The component utilizes utility functions to format dates.                                                                                                                            |
| [About.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/profile-cmps/About.tsx)                   | The code defines a React functional component "About" that receives a user object as a prop. It renders the user's name in a div element.                                                                                                                                                                                                                                                                                                                       |
| [Friends.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/profile-cmps/Friends.tsx)               | This code defines a React functional component called "Friends". It receives props like "isUserProfile", "friends", and "sessionId". The component renders a list of friends with their names and profile pictures. It provides options to delete a friend and start a private chat with a friend. If there are no friends, an empty state component is displayed with a button to find friends.                                                                |
| [Opinions.tsx](https://github.com/Daniel1231234/politai/blob/main/src/components/profile-cmps/Opinions.tsx)             | The code defines a React component called "Opinions" that displays a list of opinions. It takes in parameters like username, a boolean indicating whether the profile being viewed is the user's own profile, and an array of opinion objects. The component renders a grid of OpinionItem components that display each opinion. If there are no opinions, it shows an "EmptyState" component. When a button is clicked, it opens a modal to add a new opinion. |

</details>

---

## 🚀 Getting Started

### 📦 Dependencies

Please ensure you have the following dependencies installed on your system:

- **Node.js**: Required for running the backend server and scripts. [Download here](https://nodejs.org/)
- **MongoDB Atlas**: Required for the database layer. [Get started here](https://www.mongodb.com/cloud/atlas)

### 🔧 Installation

1. Clone the politai repository:

```sh
git clone https://github.com/Daniel1231234/politai.git
```

2. Change to the project directory:

```sh
cd politai
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running politai

```sh
npm run dev
```

---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).

```sh
git checkout -b new-feature-branch
```

4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.

```sh
git commit -m 'Implemented new feature.'
```

6. Push your changes to your forked repository on GitHub using the following command

```sh
git push origin new-feature-branch
```

7. Create a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
   The project maintainers will review your changes and provide feedback or merge them into the main branch.

---
