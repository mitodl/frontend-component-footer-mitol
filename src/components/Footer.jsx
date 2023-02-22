import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  renderLinkIfExists(value, text) {
    return value && <li><a href={value}>{text}</a></li>;
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;
    return (
      <footer
        role="contentinfo"
        className="footer d-flex border-top py-3 px-4"
      >
        <div className="container-fluid d-flex">
          { process.env.SHOW_LOGO
          && (
          <a
            className="d-block"
            href={process.env.SITE_URL}
            aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
          >
            <img
              style={{ maxHeight: 45 }}
              src={logo || config.LOGO_TRADEMARK_URL}
              alt={process.env.LOGO_ALT_TEXT || intl.formatMessage(messages['footer.logo.altText'])}
            />
          </a>
          )}
          <div className="copyright-col">
            {process.env.TRADEMARK_TEXT
            && (
            <div className="text-gray-500 small">
                {process.env.TRADEMARK_TEXT}
            </div>
            )}
            <div>
              <ul className="footer-sub-nav">
                {this.renderLinkIfExists(process.env.ABOUT_US_URL, 'About Us')}
                {this.renderLinkIfExists(process.env.TERMS_OF_SERVICE_URL, 'Terms of Service')}
                {this.renderLinkIfExists(process.env.PRIVACY_POLICY_URL, 'Privacy Policy')}
                {this.renderLinkIfExists(process.env.HONOR_CODE_URL, 'Honor Code')}
                {this.renderLinkIfExists(process.env.Contact, 'Contact')}
                {this.renderLinkIfExists(process.env.SUPPORT_CENTER_URL, process.env.SUPPORT_CENTER_TEXT || 'FAQ & Help')}
              </ul>
            </div>
          </div>
          <div className="flex-grow-1" />
          {showLanguageSelector && (
            <LanguageSelector
              options={supportedLanguages}
              onSubmit={onLanguageSelected}
            />
          )}
        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
