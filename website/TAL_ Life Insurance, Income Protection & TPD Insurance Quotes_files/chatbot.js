


const openChatbot = () => {
    const chatbot = document.getElementById("chatbotlayer");
    chatbot.classList.remove("hideBox");
    chatbot.classList.add("showBox");
    chatbot.style.display = "block";
}

const closeChatbot = () => {
    const chatbot = document.getElementById("chatbotlayer");
    chatbot.classList.remove("showBox");
    chatbot.classList.add("hideBox");
    // chatbot.style.display = "block";
    chatbot.style.display = "none";
}


const openChatbotButton = () => {
    const button = document.getElementById("chatbotbutton");
    button.style.display = "block";
}

const closeChatbotButton = () => {
    const button = document.getElementById("chatbotbutton");
    button.style.display = "none";
}


function chatbotButton() {
    openChatbot();
    closeChatbotButton();
}
 
function minimiseButton() {
    closeChatbot();
    openChatbotButton();
}


setTimeout(() => {
    chatbotButton();
}, 5000);



function fontFamily(fonts) {
    return fonts.map(font => `'${font}'`).join(', ');
}

 // Add your BOT ID below
 var theURL = "https://default4dbcd4a72a7e4f219b91faf08a25c6.5e.environment.api.powerplatform.com/powervirtualagents/bots/2499ebd8-34b1-4929-a81c-55d9fac6e475/directline/token?api-version=2022-03-01-preview";

 const store = window.WebChat.createStore(
    {},
    ({ dispatch }) => next => action => {
        if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
           dispatch({

               meta: {
                    method: "keyboard",
                },
                payload: {
                    activity: {
                          channelData: {
                               postBack: true,
                          },
                           //Web Chat will show the 'Greeting' System Topic message which has a trigger-phrase 'hello'
                           name: 'startConversation',
                           type: "event"
                      },
                 },
                 type: "DIRECT_LINE/POST_ACTIVITY",
            });
      }
      return next(action);
   }
);
fetch(theURL)
     .then(response => response.json())
     .then(conversationInfo => {
         window.WebChat.renderWebChat(
             {
                 directLine: window.WebChat.createDirectLine({
                     token: conversationInfo.token,
                 }),
                 store: store,
                 styleOptions: {
                    // Add styleOptions to customize web chat canvas
                    hideUploadButton: true,
                    botAvatarImage: '1538298822.svg',
                    botAvatarInitials: "",
                    botAvatarBackgroundColor: "#E3E3E3",
                    primaryFont: fontFamily(["Pluto Sans", "Arial", "Helvetica", "sans-serif"]),
                    fontSizeSmall: '60%',

                 },
                 webSpeechPonyfillFactory: window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
                    credentials: {
                        region: "australiaeast",
                        subscriptionKey: "99a613e223734284be6d6cbdd667f9ee"
                    }
                 })
             },
             document.getElementById('chatbot')
         );
     })
     .catch(err => console.error("An error occurred: " + err));
