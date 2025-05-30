#########################
frontend-component-footer
#########################

|Build Status| |Codecov| |npm_version| |npm_downloads| |license| |semantic-release|

********
Purpose
********

A generic footer for Open edX micro-frontend applications.  It includes a logo and an optional language selector dropdown.

***************
Getting Started
***************

Prerequisites
=============

The `devstack`_ is currently recommended as a development environment for your
new MFE.  If you start it with ``make dev.up.lms`` that should give you
everything you need as a companion to this frontend.

Note that it is also possible to use `Tutor`_ to develop an MFE.  You can refer
to the `relevant tutor-mfe documentation`_ to get started using it.

.. _Devstack: https://github.com/openedx/devstack

.. _Tutor: https://github.com/overhangio/tutor

.. _relevant tutor-mfe documentation: https://github.com/overhangio/tutor-mfe#mfe-development

Requirements
============

This component uses ``@edx/frontend-platform`` services such as i18n, analytics, configuration, and the ``AppContext`` React component, and expects that it has been loaded into a micro-frontend that has been properly initialized via ``@edx/frontend-platform``'s ``initialize`` function.  `Please visit the frontend template application to see an example. <https://github.com/openedx/frontend-template-application/blob/3355bb3a96232390e9056f35b06ffa8f105ed7ca/src/index.jsx>`_

Environment Variables
=====================

This component requires that the following environment variable be set by the consuming micro-frontend.

* ``LMS_BASE_URL`` - The URL of the LMS of your Open edX instance.
* ``LOGO_TRADEMARK_URL`` - This is a URL to a logo for use in the footer.  This is a different environment variable than ``LOGO_URL`` (used in frontend-component-header) to accommodate sites that would like to have additional trademark information on a logo in the footer, such as a (tm) or (r) symbol.

Installation
============

To install this footer into your Open edX micro-frontend, run the following command in your MFE:

``npm i --save @edx/frontend-component-footer``

This will make the component available to be imported into your application.

Cloning and Startup
===================

.. code-block::


  1. Clone your new repo:

    ``git clone https://github.com/openedx/frontend-component-footer.git``

  2. Use node v18.x.

    The current version of the micro-frontend build scripts support node 18.
    Using other major versions of node *may* work, but this is unsupported.  For
    convenience, this repository includes an .nvmrc file to help in setting the
    correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

  3. Install npm dependencies:

    ``cd frontend-component-footer && npm ci``

  4. Start the dev server:

    ``npm start``

Usage
=====

This library has the following exports:

* ``(default)``: The footer as a React component.
* ``messages``: Internationalization messages suitable for use with `@edx/frontend-platform/i18n <https://edx.github.io/frontend-platform/module-Internationalization.html>`_
* ``dist/footer.scss``: A SASS file which contains style information for the component.  It should be imported into the micro-frontend's own SCSS file.

<Footer /> component props
==========================

* onLanguageSelected: Provides the footer with an event handler for when the user selects a
  language from its dropdown.
* supportedLanguages: An array of objects representing available languages.  See example below for object shape.

Plugin
======
The footer can be replaced using using `Frontend Plugin Framework <https://github.com/openedx/frontend-plugin-framework>`_.

Information on how to utilize the ``FooterSlot`` component to do so is available in the `frontend-slot-footer repository <https://github.com/openedx/frontend-slot-footer/>`_.

Examples
========

Component Usage Example::

  import Footer, { messages } from '@edx/frontend-component-footer';

  ...

  <Footer
    onLanguageSelected={(languageCode) => {/* set language */}}
    supportedLanguages={[
      { label: 'English', value: 'en'},
      { label: 'Español', value: 'es' },
    ]}
  />

* `An example of minimal component and messages usage. <https://github.com/openedx/frontend-template-application/blob/3355bb3a96232390e9056f35b06ffa8f105ed7ca/src/index.jsx#L23>`_
* `An example of SCSS file usage. <https://github.com/openedx/frontend-template-application/blob/3cd5485bf387b8c479baf6b02bf59e3061dc3465/src/index.scss#L9>`_



Development
===========

Install dependencies::

  npm i

Start the development server::

  npm start

Build a production distribution::

  npm run build

License
=======

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Contributing
============

Contributions are very welcome.  Please read `How To Contribute`_ for details.

.. _How To Contribute: https://openedx.org/r/how-to-contribute

This project is currently accepting all types of contributions, bug fixes,
security fixes, maintenance work, or new features.  However, please make sure
to have a discussion about your new feature idea with the maintainers prior to
beginning development to maximize the chances of your change being accepted.
You can start a conversation by creating a new issue on this repo summarizing
your idea.

Getting Help
===========

If you're having trouble, we have discussion forums at
https://discuss.openedx.org where you can connect with others in the community.

Our real-time conversations are on Slack. You can request a `Slack
invitation`_, then join our `community Slack workspace`_.  Because this is a
frontend repository, the best place to discuss it would be in the `#wg-frontend
channel`_.

For anything non-trivial, the best path is to open an issue in this repository
with as many details about the issue you are facing as you can provide.

https://github.com/openedx/frontend-component-footer/issues

For more information about these options, see the `Getting Help`_ page.

.. _Slack invitation: https://openedx.org/slack
.. _community Slack workspace: https://openedx.slack.com/
.. _#wg-frontend channel: https://openedx.slack.com/archives/C04BM6YC7A6
.. _Getting Help: https://openedx.org/community/connect

The Open edX Code of Conduct
============================

All community members are expected to follow the `Open edX Code of Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

Reporting Security Issues
=========================

Please do not report security issues in public. Please email security@openedx.org.
=======
***********
Local Development
***********

For local development and testing follow these steps. (for convenience sake consider learning MFE as parent app)

* Clone frontend-component-footer-mitol into frontend-app-learning directory.
* CD into the frontend-component-footer-mitol and run the following commands::
    
    npm i

    npm build
* Verify a `dist/` directory has been created.
* CD back into frontend-app-learning and create a module.config.js file
* Place the following code in the module.config.js::

    module.exports = {
        localModules: [
           { moduleName: '@edx/frontend-component-footer', dir: './frontend-component-footer-mitol' },
    }

* Restart frontend-app-learning and verify it is using the local version  from @edx/frontend-component-footer
* For css changes you might need to rebuild again.
