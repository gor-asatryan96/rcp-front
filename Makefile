BIN = ./node_modules/.bin
TAG = registry.betunit.com/risk-managment/gpa-frontend
VERSION = $(shell node -pe "require('./package.json').version")

define release
    VERSION=`node -pe "require('./package.json').version"` && \
    NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
    node -e "\
        var j = require('./package.json');\
        j.version = \"$$NEXT_VERSION\";\
        var s = JSON.stringify(j, null, 2);\
        require('fs').writeFileSync('./package.json', s);" && \
    git commit -m "Version $$NEXT_VERSION" -- package.json && \
    git tag "$$NEXT_VERSION" -m "Version $$NEXT_VERSION"
endef


release-patch:
	@$(call release,patch)

release-minor:
	@$(call release,minor)

release-major:
	@$(call release,major)

docker-run: docker-build
	docker run -it $(TAG):$(VERSION)

docker-build: release-patch
	docker build -t $(TAG):$(VERSION) -f Dockerfile .

docker-push:
	docker push $(TAG):$(VERSION)

.PHONY: docker
docker: docker-build
	docker push $(TAG):$(VERSION)

