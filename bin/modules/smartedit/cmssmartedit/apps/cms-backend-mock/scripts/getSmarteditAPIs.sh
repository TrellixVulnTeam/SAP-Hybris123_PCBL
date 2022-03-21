#!/bin/sh

# Download and unzip cmssmartedit-apis Swagger contracts.

REPO_URL=$1
ARTIFACT=$2
ARTIFACT_VERSION=$3
CONTRACTS=$4
WORKSPACE=$5

ARCHIVE_FILE="smartedit-apis-${ARTIFACT_VERSION}.jar"

echo "Downloading ${ARTIFACT} version:${ARTIFACT_VERSION} - contracts list: ${CONTRACTS}"
mvn org.apache.maven.plugins:maven-dependency-plugin:2.4:get -DrepoUrl=${REPO_URL} -Dartifact=${ARTIFACT}:${ARTIFACT_VERSION}:jar -Ddest=${WORKSPACE}/${ARCHIVE_FILE}

echo "Unzipping archive ${ARCHIVE_FILE} to ${WORKSPACE}..."
unzip -o -j -qq ${WORKSPACE}/${ARCHIVE_FILE} ${CONTRACTS} -d ${WORKSPACE}
echo "👌 ${ARTIFACT} contracts were downloaded successfully."
