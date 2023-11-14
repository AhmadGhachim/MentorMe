import { css } from "@emotion/css";


const Landing = () => {

  return (
      
      <div
          className={css`
        position: relative;
        background-color: #f5faff;
        width: 100%;
        height: 3744px;
        overflow: hidden;
        text-align: left;
        font-size: 48px;
        color: #016eea;
        font-family:system-ui;
      `}
      >
        <div
            className={css`
          position: absolute;
          top: calc(50% - 871px);
          left: calc(50% - 136px);
          font-size: 64px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 264px;
          height: 104px;
        `}
        >
          Features
        </div>
        <div
            className={css`
          position: absolute;
          top: calc(50% - 1717px);
          left: calc(50% - 664px);
          width: 1328px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          font-size: 20px;
        `}
        >
          <div
              className={css`
            position: relative;
            width: 601px;
            height: 446.1px;
            overflow: hidden;
            flex-shrink: 0;
          `}
          >
            <div
                className={css`
              position: absolute;
              top: 389.4px;
              left: 0px;
              border-radius: 4px;
              background-color: #e6f1ff;
              width: 153px;
              height: 56.7px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            `}
            >
              <div
                  className={css`
                position: relative;
                display: inline-block;
                width: 107px;
                height: 24px;
                flex-shrink: 0;
              `}
              >
                Learn More
              </div>
            </div>
            <div
                className={css`
              position: absolute;
              top: 389.4px;
              left: 183px;
              border-radius: 4px;
              background-color: #016eea;
              box-shadow: 1px 2px 4px rgba(21, 106, 206, 0.25);
              width: 182px;
              height: 56.7px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #fafeff;
            `}
            >
              <div
                  className={css`
                position: relative;
                display: inline-block;
                width: 151px;
                height: 26.2px;
                flex-shrink: 0;
                mix-blend-mode: normal;
              `}
              >
                <a href="/Signup" className={css`
                text-decoration: none;
                color:#FFFFFF
              `}>Create Account</a>
              </div>
            </div>
            <div
                className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              font-size: 64px;
              display: flex;
              align-items: center;
              width: 601px;
              height: 269.4px;
            `}
            >{`Accessible and tailored mentorship experience `}</div>
            <div
                className={css`
              position: absolute;
              top: 284.7px;
              left: 0px;
              font-size: 24px;
              color: #000;
              display: flex;
              align-items: center;
              width: 596px;
              height: 67.6px;
            `}
            >
              Find mentors to develop your skills and connect with like minded
              individuals.
            </div>
          </div>
          <img
              className={css`
            position: relative;
            width: 668px;
            height: 686px;
            overflow: hidden;
            flex-shrink: 0;
          `}
              alt=""
              src="/mentoring-illustration.svg"
          />
        </div>
        <div
            className={css`
          position: absolute;
          width: 100%;
          top: 0px;
          right: 0%;
          left: 0%;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid #e6f1ff;
          box-sizing: border-box;
          height: 101px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding: 11px 64px 10px;
        `}
        >
          <div
              className={css`
            width: 334.5px;
            height: 79px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 3px;
          `}
          >
            <img
                className={css`
              position: relative;
              width: 111.3px;
              height: 75px;
              object-fit: cover;
            `}
                alt=""
                src="/graduate-hat@2x.png"
            />
            <div
                className={css`
              position: relative;
              display: flex;
              align-items: center;
              width: 262.7px;
              height: 75px;
              flex-shrink: 0;
            `}
            >
              MentorMe
            </div>
          </div>
          <div
              className={css`
            width: 334.5px;
            height: 43px;
            overflow: hidden;
            flex-shrink: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 24px;
            font-size: 20px;
          `}
          >
            <div
                className={css`
              border-radius: 4px;
              background-color: #e6f1ff;
              width: 89px;
              height: 43px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            `}
            >
              <div
                  className={css`
                position: relative;
              `}
              >
               <a href="/Signin" className={css`
                text-decoration: none;
                color:#016eea
              `}>Login</a>
              </div>
            </div>
            <div
                className={css`
              border-radius: 4px;
              background-color: #016eea;
              box-shadow: 1px 2px 4px rgba(21, 106, 206, 0.25);
              width: 177px;
              height: 43px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #fafeff;
            `}
            >
              <div
                  className={css`
                position: relative;
                display: inline-block;
                width: 147px;
                mix-blend-mode: normal;
              `}
              >
                <a href="/Signup" className={css`
                text-decoration: none;
                color:#FFFFFF
              `}>Create Account</a>
              </div>
            </div>
          </div>
        </div>
        <div
            className={css`
          position: absolute;
          top: calc(50% + 779px);
          left: calc(50% - 589px);
          width: 1178px;
          height: 628px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0px 41px;
          box-sizing: border-box;
          gap: 30px;
          text-align: center;
          font-size: 64px;
          color: #1c1c1c;
        `}
        >
          <div
              className={css`
            position: relative;
            color: #016eea;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 385px;
            height: 104px;
            flex-shrink: 0;
          `}
          >
            Top Mentors
          </div>
          <div
              className={css`
            position: relative;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 773px;
          `}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
            neque interdum mollis venenatis. Nulla vel ornare turpis. Fusce magna
            turpis, eleifend eu leo sed, varius vehicula odio.
          </div>
          <div
              className={css`
            position: relative;
            width: 1086.5px;
            height: 352px;
            text-align: left;
            font-size: 14px;
          `}
          >
            <div
                className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              border-radius: 8px;
              background-color: #fff;
              width: 292.5px;
              height: 352px;
              font-size: 24px;
            `}
            >
              <img
                  className={css`
                position: absolute;
                top: 10px;
                left: 10px;
                border-radius: 8px;
                width: 272.5px;
                height: 252px;
                object-fit: cover;
              `}
                  alt=""
                  src="/avatar-image@2x.png"
              />
              <div
                  className={css`
                position: absolute;
                top: 269px;
                left: 84px;
                width: 125px;
                height: 22px;
              `}
              >
                <div
                    className={css`
                  position: absolute;
                  top: 0px;
                  left: -9px;
                `}
                >
                  Anas Hafiza
                </div>
                <div
                    className={css`
                  position: absolute;
                  top: 26px;
                  left: 0px;
                  display: none;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  gap: 4px;
                  font-size: 14px;
                  color: #64748b;
                  font-family: Inter;
                `}
                >
                  <img
                      className={css`
                    position: relative;
                    width: 18px;
                    height: 18px;
                  `}
                      alt=""
                      src="/link.svg"
                  />
                  <div
                      className={css`
                    position: relative;
                    letter-spacing: -0.01em;
                    line-height: 20px;
                  `}
                  >
                    Link
                  </div>
                </div>
              </div>
              <div
                  className={css`
                position: absolute;
                top: 305px;
                left: 39px;
                font-size: 16px;
                display: inline-block;
                width: 215px;
                height: 18px;
              `}
              >
                Software Engineer @Google
              </div>
            </div>
            <div
                className={css`
              position: absolute;
              top: 0px;
              left: 417.5px;
              border-radius: 8px;
              background-color: #fff;
              width: 272px;
              height: 352px;
            `}
            >
              <img
                  className={css`
                position: absolute;
                top: 10px;
                left: 10px;
                border-radius: 8px;
                width: 252px;
                height: 252px;
                object-fit: cover;
              `}
                  alt=""
                  src="/avatar-image1@2x.png"
              />
              <div
                  className={css`
                position: absolute;
                top: 271px;
                left: 48px;
                width: 83px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                color: #64748b;
                font-family: Inter;
              `}
              >
                <div
                    className={css`
                  display: none;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  gap: 4px;
                `}
                >
                  <img
                      className={css`
                    position: relative;
                    width: 18px;
                    height: 18px;
                  `}
                      alt=""
                      src="/link.svg"
                  />
                  <div
                      className={css`
                    position: relative;
                    letter-spacing: -0.01em;
                    line-height: 20px;
                  `}
                  >
                    Link
                  </div>
                </div>
              </div>
              <div
                  className={css`
                position: absolute;
                top: 269px;
                left: 78px;
                font-size: 24px;
              `}
              >
                Jolene Orr
              </div>
              <div
                  className={css`
                position: absolute;
                top: 305px;
                left: 27px;
                font-size: 16px;
                display: inline-block;
                width: 219px;
                height: 30px;
              `}
              >
                Project manager @Facebook
              </div>
            </div>
            <div
                className={css`
              position: absolute;
              top: 0px;
              left: 814.5px;
              border-radius: 8px;
              background-color: #fff;
              width: 272px;
              height: 352px;
            `}
            >
              <img
                  className={css`
                position: absolute;
                top: 10px;
                left: 10px;
                border-radius: 8px;
                width: 252px;
                height: 252px;
                object-fit: cover;
              `}
                  alt=""
                  src="/avatar-image2@2x.png"
              />
              <div
                  className={css`
                position: absolute;
                top: 270px;
                left: 10px;
                width: 65px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                color: #64748b;
                font-family: Inter;
              `}
              >
                <div
                    className={css`
                  display: none;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                  gap: 4px;
                `}
                >
                  <img
                      className={css`
                    position: relative;
                    width: 18px;
                    height: 18px;
                  `}
                      alt=""
                      src="/link.svg"
                  />
                  <div
                      className={css`
                    position: relative;
                    letter-spacing: -0.01em;
                    line-height: 20px;
                  `}
                  >
                    Link
                  </div>
                </div>
              </div>
              <div
                  className={css`
                position: absolute;
                top: 269px;
                left: 106px;
                font-size: 24px;
              `}
              >
                Henry
              </div>
              <div
                  className={css`
                position: absolute;
                top: 305px;
                left: 44px;
                font-size: 16px;
                display: inline-block;
                width: 190px;
                height: 28px;
              `}
              >
                Acquisitions @BlackRock
              </div>
            </div>
          </div>
        </div>
        <div
            className={css`
          position: absolute;
          top: calc(50% - 703px);
          left: calc(50% - 630px);
          width: 1253px;
          height: 859px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: #1c1c1c;
        `}
        >
          <div
              className={css`
            position: relative;
            width: 1253px;
            height: 381px;
          `}
          >
            <div
                className={css`
              position: absolute;
              top: 40px;
              left: 625px;
              width: 628px;
              height: 238px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
            `}
            >
              <div
                  className={css`
                position: relative;
                display: flex;
                align-items: center;
                width: 628px;
                height: 208px;
                flex-shrink: 0;
              `}
              >
                Meet and connect with industry professionals
              </div>
              <div
                  className={css`
                position: relative;
                font-size: 24px;
                color: #000;
                display: flex;
                align-items: center;
                width: 545.5px;
                margin-top: -32px;
              `}
              >
                Have a one-on-one meetings with leading professionals from wide
                range of industries.
              </div>
            </div>
            <img
                className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              width: 432px;
              height: 381px;
              overflow: hidden;
            `}
                alt=""
                src="/connect.svg"
            />
          </div>
          <div
              className={css`
            position: relative;
            width: 1223px;
            height: 518px;
          `}
          >
            <div
                className={css`
              position: absolute;
              top: 178px;
              left: 0px;
              width: 601px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
            `}
            >
              <div
                  className={css`
                position: relative;
                display: flex;
                align-items: center;
                width: 601px;
                height: 208px;
                flex-shrink: 0;
              `}
              >
                Join discussion groups
              </div>
              <div
                  className={css`
                position: relative;
                font-size: 24px;
                color: #000;
                display: flex;
                align-items: center;
                width: 522px;
                margin-top: -72px;
              `}
              >
                Share and participate within your community to learn about the
                latest trends in your industry.
              </div>
            </div>
            <img
                className={css`
              position: absolute;
              top: 0px;
              left: 639px;
              width: 584px;
              height: 518px;
              overflow: hidden;
            `}
                alt=""
                src="/groups.svg"
            />
          </div>
        </div>
        <div
            className={css`
          position: absolute;
          top: calc(50% + 220px);
          left: calc(50% - 650px);
          width: 1233px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          color: #1c1c1c;
        `}
        >
          <img
              className={css`
            position: relative;
            width: 507px;
            height: 528.1px;
            z-index: 0;
          `}
              alt=""
              src="/success-social-media---achievement-woman-trophy-award-reward-win-competition.svg"
          />
          <div
              className={css`
            position: relative;
            display: flex;
            align-items: center;
            width: 628px;
            height: 437px;
            flex-shrink: 0;
            z-index: 1;
          `}
          >
            Attend mentor session and participate in discussions to gain
            achievements
          </div>
          <div
              className={css`
            position: absolute;
            margin: 0 !important;
            top: 360.3px;
            left: 605.4px;
            font-size: 24px;
            color: #000;
            display: flex;
            align-items: center;
            width: 613.9px;
            height: 107.7px;
            flex-shrink: 0;
            z-index: 2;
          `}
          >
            Participating in discussions and attending sessions will gain you
            certificates and badges on your profile.
          </div>
        </div>
        <div
            className={css`
          position: absolute;
          width: 100%;
          top: calc(50% + 1520px);
          right: 0%;
          left: 0%;
          background-color: #016eea;
          height: 352px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 66px 378px;
          box-sizing: border-box;
          font-size: 96px;
          color: #f5faff;
        `}
        >
          <div
              className={css`
            width: 684.3px;
            height: 189px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 13px;
          `}
          >
            <img
                className={css`
              position: relative;
              width: 186.3px;
              height: 120px;
              object-fit: cover;
            `}
                alt=""
                src="/graduate-hat1@2x.png"
            />
            <b
                className={css`
              position: relative;
              display: flex;
              align-items: center;
              width: 485px;
              height: 189px;
              flex-shrink: 0;
            `}
            >
              MentorMe
            </b>
          </div>
          <div
              className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          `}
          >
            <div
                className={css`
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 32px;
            `}
            >
              <div
                  className={css`
                position: relative;
              `}
              >
                Privacy Policy
              </div>
              <div
                  className={css`
                position: relative;
              `}
              >
                Terms and conditions
              </div>
              <div
                  className={css`
                position: relative;
              `}
              >
                sitemap
              </div>
              <div
                  className={css`
                position: relative;
              `}
              >
                Legal
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Landing;
