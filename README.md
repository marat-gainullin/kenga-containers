# kenga-containers
Kenga containers. Border, Anchor, Box, Mdi, etc.

# Install
To install `kenga-containers` package to your project, type the following command:
`npm install kenga-containers --save`

# Using
To use `HolyGrailPane` you can write something like this: `const hg = new HolyGrailPane(10/*horizontal gap*/, 5 /*vertical gap*/); hg.header = toolbar; hg.leftSide = ads; hg.content = yourAwesomeContent;`.

# Architecture
The `HolyGrailPane` container is holy grail pattern implementation. It has `header`, `leftSide`, `rightSide`, `content` and `footer` properties.
Header and footer should have a content or height. Left side and right side should have a content or width. Content widget will be stretched up to all remaning space.

The `FlowPane` container is simply block with natural document flow inside. So it can be used to build your own layout, or as a container of some arbitrary `HTML` code, as a stub and so on.

The `BoxPane` container, which may be used as horizontal box or vertical box. It has auto scroll feature, supports by content and by explicit size markup as well.
if box is horizontal, then its children are stretched by height to the container and stay untouched by width and vice versa if it is vertical box.
While these transformation of children, evert child element's style remains **untouched**. So if you whant to do some custom layout formatting you are free to do it!

The `Toolbar` container is only horizontal box with left and write overflow chevrons.

The `CardPane` container is a stack container with any number of children and only one visible at a time.
This container size may be specified explicitly as well as calculated by content.
To turn on by content layout, you should ensure that width and height of the container are not specified explicitly.

The `TabbedPane` container is a stack container with any number of children and only one visible at a time.
It has one label per each child on top of the content. Labels can customized to be closable. Closing of a label will remove correspoding widget from the container.
When a widet is added to this container, `tab` property is injected to it and, so, application is able to customize tab label's text, icon and closable flag.
This container size may be specified explicitly as well as calculated by content.
To turn on by content layout, you should ensure that width and height of the container are not specified explicitly.

The `AnchorsPane` container govens its children layout according to thiers `left`, `top`, `width`, `height`, `right`, `bottom` properties of child element's style.
You can assign `left`, `top`, `width`, `height` properties of a child widget like this `const w = new Flow(); const shell = new AnchorsPane(); shell.add(w); w.width += 100;` and while such assignment,
`AnchorsPane` container intercepts this action and it recalculate the child element's style to preserve layout rules, such as `width: xx%` on one hand and make the child's width to be just assigned value.
It is container, which size is to be determined by an application or other up level container. 

The `ScrollPane` container contains single child and supports various scroll policies.
It is container, which size is to be determined by an application or other up level container.

The `SplitPane` container contains two children and draggable divider.
It is container, which size is to be determined by an application or other up level container.

The `GridPane` is equal width and equal height cells container. Number of rows and columns are given in constructor call once and then can't be changed.
If you need to add content infinitely and dynamically, then you should use `FlowPane` container.

The `DesktopPane` container contains `WindowPane` instanceed as its children and it govens them. It can enumerate windows inside it, maximize, minimize, restore or close them all.
Also widgets other then windows may be added to this container, and if so they will be govened as inside a `FlowPane`.
