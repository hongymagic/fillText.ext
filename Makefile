SRC_DIR = src
TEST_DIR = test
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

JS_ENGINE ?= `which node nodejs`
COMPILER = ${JS_ENGINE} ${BUILD_DIR}/uglify.js --unsafe
POST_COMPILER = ${JS_ENGINE} ${BUILD_DIR}/post-compile.js

BASE_FILES = ${SRC_DIR}/parser.js\
	${SRC_DIR}/core.js\

MODULES = ${SRC_DIR}/intro.js\
	${BASE_FILES}\
	${SRC_DIR}/outro.js

CF = ${DIST_DIR}/canvas.fillText.js
CF_MIN = ${DIST_DIR}/canvas.fillText.min.js

CF_VER = $(shell cat version.txt)
VER = sed "s/@VERSION/${CF_VER}/"

DATE=$(shell git log -1 --pretty=format:%ad)

all: update_submodules core

core: canvas min lint
	@@echo "Canvas.fillText build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

canvas: ${CF}

${CF}: ${MODULES} | ${DIST_DIR}
	@@echo "Building" ${CF}

	@@cat ${MODULES} | \
		sed 's/.function..Canvas.fillText...{//' | \
		sed 's/}...Canvas.fillText..;//' | \
		sed 's/@DATE/'"${DATE}"'/' | \
		${VER} > ${CF};

lint: canvas
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Checking Canvas.fillText against JSLint..."; \
		${JS_ENGINE} build/jslint-check.js; \
	else \
		echo "You must have NodeJS installed in order to test canvas against JSLint."; \
	fi

min: canvas ${CF_MIN}

${CF_MIN}: ${CF}
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Minifying canvas" ${CF_MIN}; \
		${COMPILER} ${CF} > ${CF_MIN}.tmp; \
		${POST_COMPILER} ${CF_MIN}.tmp > ${CF_MIN}; \
		rm -f ${CF_MIN}.tmp; \
	else \
		echo "You must have NodeJS installed in order to minify Canvas.fillText."; \
	fi
	

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

	@@echo "Removing built copy of Sizzle"
	@@rm -f src/selector.js

distclean: clean
	@@echo "Removing submodules"
	@@rm -rf test/qunit src/sizzle

# change pointers for submodules and update them to what is specified in Canvas.fillText
# --merge  doesn't work when doing an initial clone, thus test if we have non-existing
#  submodules, then do an real update
update_submodules:
	@@if [ -d .git ]; then \
		if git submodule status | grep -q -E '^-'; then \
			git submodule update --init --recursive; \
		else \
			git submodule update --init --recursive --merge; \
		fi; \
	fi;

# update the submodules to the latest at the most logical branch
pull_submodules:
	@@git submodule foreach "git pull \$$(git config remote.origin.url)"
	@@git submodule summary

pull: pull_submodules
	@@git pull ${REMOTE} ${BRANCH}

.PHONY: all canvas lint min clean distclean update_submodules pull_submodules pull core
