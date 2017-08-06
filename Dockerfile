FROM mhart/alpine-node
COPY . /RyanSept-Bucketlist-Frontend
WORKDIR /RyanSept-Bucketlist-Frontend
RUN npm install
RUN npm install -g serve
EXPOSE 5000
CMD serve -s build
