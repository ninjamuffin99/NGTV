/**
* @preserve Copyright (c) 2013 British Broadcasting Corporation
* (http://www.bbc.co.uk) and TAL Contributors (1)
*
* (1) TAL Contributors are listed in the AUTHORS file and at
*     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
*     not this notice.
*
* @license Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* All rights reserved
* Please contact us for an alternative licence
*/

define(
  "sampleapp/appui/components/simple",
  [
    "antie/widgets/component",
    "antie/widgets/image",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/verticallist",
    "antie/widgets/carousel",
    "antie/widgets/grid",
    "antie/datasource",
    "sampleapp/appui/formatters/simpleformatter",
    "sampleapp/appui/datasources/simplefeed"
  ],
  function (Component, Image, Button, Label, VerticalList, Carousel, Grid, DataSource, SimpleFormatter, SimpleFeed) {

    // All components extend Component
    return Component.extend({
      init: function init () {
        var self, helloWorldLabel, welcomeLabel, carouselButtonLabel, testGrid, verticalListMenu;

        self = this;

        // It is important to call the constructor of the superclass
        init.base.call(this, "simplecomponent");

        // Add the labels to the component
        helloWorldLabel = new Label("helloWorldLabel", "FANCY STUFF HEY");
        this.appendChildWidget(helloWorldLabel);

        welcomeLabel = new Label("welcomeLabel", "Use arrow keys and enter");
        this.appendChildWidget(welcomeLabel);

        var testButton = new Button();
        testButton.addEventListener("select", function(evt){
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simplevideocomponent1");
        });
        testButton.appendChildWidget(new Image("Lmao dumb dumb", "https://picon.ngfiles.com/715000/flash_715876.png?f1534807443"));

        
        var testButton1 = new Button();
        testButton1.addEventListener("select", function(evt){
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simplevideocomponent2");
        });
        testButton1.appendChildWidget(new Image("Lmao", "https://picon.ngfiles.com/714000/flash_714599.jpg?f1532623960"));


        var aGrid = new Grid("testGrid", 3, 3, false, false);
        aGrid.setWidgetAt(1, 1, new Label("lol test"));
        aGrid.setWidgetAt(1, 2, new Label("more test"));
        aGrid.setWidgetAt(2, 2, new Label("more test2"));

        var newCarouselButton = this._createCarouselButton();
        
        var playerButton = new Button();
        playerButton.addEventListener("select", function(evt){
          self.getCurrentApplication().pushComponent("maincontainer", "sampleapp/appui/components/simplevideocomponent");
        });
        playerButton.appendChildWidget(new Image('test', "https://picon.ngfiles.com/715000/flash_715551.png?f1534358175"));

        // Create a vertical list and append the buttons to navigate within the list
        verticalListMenu = new VerticalList("mainMenuList");
        //verticalListMenu.appendChildWidget(newCarouselButton);
        verticalListMenu.appendChildWidget(playerButton);
        verticalListMenu.appendChildWidget(testButton);
        verticalListMenu.appendChildWidget(testButton1);
        this.appendChildWidget(verticalListMenu);

        // calls Application.ready() the first time the component is shown
        // the callback removes itself once it's fired to avoid multiple calls.
        this.addEventListener("aftershow", function appReady(evt) {
          self.getCurrentApplication().ready();
          self.removeEventListener('aftershow', appReady);
        });
      },

      _createCarouselButton: function () {
        var self = this;
        function carouselExampleSelected() {
          self.getCurrentApplication().pushComponent(
            "maincontainer",
            "sampleapp/appui/components/carouselcomponent",
            self._getCarouselConfig()
          );
        }
       
        var button = new Button('carouselButton');
        button.appendChildWidget(new Label("Carousel Example"));
        button.addEventListener('select', carouselExampleSelected);
        return button;
      },

      _getCarouselConfig: function () {
        return {
          description: "Carousel example, LEFT and RIGHT to navigate, SELECT to go back",
          dataSource: new DataSource(null, new SimpleFeed(), 'loadData'),
          formatter: new SimpleFormatter(),
          orientation: Carousel.orientations.HORIZONTAL,
          carouselId: 'verticalCullingCarousel',
          animOptions: {
            skipAnim: false
          },
          alignment: {
            normalisedAlignPoint: 0.5,
            normalisedWidgetAlignPoint: 0.5
          },
          initialItem: 4,
          type: "CULLING",
          lengths: 264
        };
      }
    });
  }
);
