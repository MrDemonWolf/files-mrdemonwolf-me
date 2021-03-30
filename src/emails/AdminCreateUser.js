const mjml = require('mjml');

/**
 *  @param password
 *  Express is the domain from the request.
 */
module.exports = password =>
  mjml(`<mjml>
  <mj-head>
       <mj-attributes>
      <mj-text font-size="13px"/>
      <mj-all fbackground-color="#ffffff"/>
    </mj-attributes>
  </mj-head>
  <mj-body>
          <mj-section>
            <mj-column>
              <mj-text font-style="bold" font-size="24px" color="#626262" align="center">
                Your account details
              </mj-text>
            <mj-divider border-color="#4f92ff" />
            </mj-column>
          </mj-section>
          <mj-wrapper padding-top="0">
            <mj-section padding-top="0">
              <mj-column>
                <mj-text>
                  You are receiving this because you (or someone else) created a account ${process.env.TITLE}.
                </mj-text>
              </mj-column>
            </mj-section>
            <mj-section>
              <mj-column>
                <mj-text>Temp password for your account is: ${password}</mj-text>
              </mj-column>
            </mj-section
          </mj-wrapper>
        </mj-body>
      </mjml>`);
