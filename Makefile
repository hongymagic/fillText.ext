#
#ADDON = build/default/canvas.node
#
#$(ADDON): src/*.cc
#	node-waf configure build
#
#test: $(ADDON)
#	@./node_modules/.bin/expresso \
#		-I lib \
#		test/*.test.js
#
#test-server: $(ADDON)
#	@node test/server.js
#
#benchmark:
#	@node benchmarks/run.js
#
#clean:
#	node-waf distclean
#
#.PHONY: test test-server benchmark clean

TITLE = "Canvas.fillText Extension"
DESC = "CSS enabled Canvas fillText extension"

PREFIX = .
SRC_DIR = ${PREFIX}/src
DOC_DIR = ${PREFIX}/doc
DIST_DIR = ${PREFIX}/dist

DOC_FILENAME = 'index.html'

DOC_ENGINE = dox --title ${TITLE} --desc ${DESC}

doc:
	${DOC_ENGINE} ${SRC_DIR}/* > ${DOC_DIR}/${DOC_FILENAME}

clean:
	@@rm -rf ${DIST_DIR} ${DOC_DIR}

.PHONY: doc clean

