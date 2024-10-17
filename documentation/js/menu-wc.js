'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' :
                                            'id="xs-controllers-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' :
                                        'id="xs-injectables-links-module-AppModule-6fef5f2a90f15f064dfea1b83d21edef8f32fb0711b18088f85be2d9252c42b6545fee47ea383b0c90352867d41b7cf43838afebd300dd3d5cdb84e560756b77"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' :
                                            'id="xs-controllers-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' :
                                        'id="xs-injectables-links-module-AuthModule-cca07edfa88378b23c6c422263ea58dac56e6132b08179a395dd09ee67d81ce7e162f37b8611b8bfdd4f9f9d01355ea1c41933abe6cf394b304a42861b3dc77c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' :
                                            'id="xs-controllers-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' :
                                        'id="xs-injectables-links-module-PostsModule-c28bf83914ad02648118365e287df0fe53921c9e947d4aa9535fcac448d39311890b90f447db3e38d87ce408a130fafe2eefc906c1d282457d2ca9e281fa2418"' }>
                                        <li class="link">
                                            <a href="injectables/PostsSerivce.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsSerivce</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' :
                                            'id="xs-controllers-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' :
                                        'id="xs-injectables-links-module-UsersModule-b94a65dbc22d7f01c4c4052e56fa4a8bd6e5c4d1d55ed8111a42cb9d57a144a996b3b7f9b23bea2d67b4a7efe746d9546d34dabeab09372b613cfe557c130e19"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateArticleMetaOptionsDto.html" data-type="entity-link" >CreateArticleMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditArticleDto.html" data-type="entity-link" >EditArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsParamsDto.html" data-type="entity-link" >GetPostsParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostArticleDto.html" data-type="entity-link" >PostArticleDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsSerivce.html" data-type="entity-link" >PostsSerivce</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});