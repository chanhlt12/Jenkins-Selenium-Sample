FROM test-env

ADD . /app

WORKDIR /app

RUN npm install chromedriver

RUN npm install

CMD ["npm", "test"]

# RUN curl -I http://test-server:3000

# CMD [ "curl" , "http://test-server:3000"]
