FROM test-env

RUN apt-get update -y
RUN apt-get install -y libappindicator1 fonts-liberation wget curl gnupg2
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
RUN echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN apt-get -y update
RUN apt-get -y install google-chrome-stable
RUN apt install -y nodejs
RUN apt install -y npm
