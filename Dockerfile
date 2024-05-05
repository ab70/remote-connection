# # use the official Bun image
# FROM oven/bun:1-alpine as base

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./


# # Install project dependencies for production
# RUN bun install
# # RUN npm install

# # Copy the rest of the application code
# COPY . ./

# EXPOSE 4000

# # Start the application
# CMD ["bun", "start"]


# #############
# Dockerfile

# use the official Bun image
# see all versions at <https://hub.docker.com/r/oven/bun/tags>
FROM oven/bun:1-alpine as base
WORKDIR /usr/src/app

# install dependencies into temp folder
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp folder
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .


# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
# COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app .

# run the app
# USER bun
EXPOSE 4001
CMD ["bun", "start"]