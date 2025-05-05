// The global namespace for the app
declare namespace App {
  namespace I18n {
    type LangType = 'en-US' | 'zh-CN'

    type LangOption = {
      key: LangType
      name: string
    }

    type FormMsg = {
      invalid: string
      required: string
    }

    type Schema = {
      translation: {
        common: {
          title: string;
          action: string;
          add: string;
          addSuccess: string;
          backToHome: string;
          batchDelete: string;
          cancel: string;
          check: string;
          close: string;
          columnSetting: string;
          config: string;
          confirm: string;
          confirmDelete: string;
          delete: string;
          deleteSuccess: string;
          edit: string;
          error: string;
          errorHint: string;
          expandColumn: string;
          index: string;
          keywordSearch: string;
          logout: string;
          logoutSuccess: string;
          logoutConfirm: string;
          lookForward: string;
          modify: string;
          modifySuccess: string;
          noData: string;
          operate: string;
          pleaseCheckValue: string;
          refresh: string;
          reset: string;
          search: string;
          switch: string;
          tip: string;
          trigger: string;
          tryAlign: string;
          update: string;
          updateSuccess: string;
          userCenter: string;
          warning: string;
          yesOrNo: {
            no: string;
            yes: string;
          };
        }
        form: {
          code: FormMsg;
          confirmPwd: FormMsg;
          email: FormMsg;
          phone: FormMsg;
          pwd: FormMsg;
          required: string;
          send: string;
          userName: FormMsg;
        }
        page: {
          about: {
            devDep: string;
            introduction: string;
            prdDep: string;
            projectInfo: {
              githubLink: string;
              latestBuildTime: string;
              previewLink: string;
              title: string;
              version: string;
            };
            title: string;
          };
          function: {
            multiTab: {
              backTab: string;
              routeParam: string;
            };
            request: {
              repeatedError: string;
              repeatedErrorMsg1: string;
              repeatedErrorMsg2: string;
              repeatedErrorOccurOnce: string;
            };
            tab: {
              tabOperate: {
                addMultiTab: string;
                addMultiTabDesc1: string;
                addMultiTabDesc2: string;
                addTab: string;
                addTabDesc: string;
                closeAboutTab: string;
                closeCurrentTab: string;
                closeTab: string;
                title: string;
              };
              tabTitle: {
                change: string;
                changeTitle: string;
                reset: string;
                resetTitle: string;
                title: string;
              };
            };
            toggleAuth: {
              adminOrUserVisible: string;
              adminVisible: string;
              authHook: string;
              superAdminVisible: string;
              toggleAccount: string;
            };
          };
          home: {
            creativity: string;
            dealCount: string;
            downloadCount: string;
            entertainment: string;
            greeting: string;
            message: string;
            projectCount: string;
            projectNews: {
              desc1: string;
              desc2: string;
              desc3: string;
              desc4: string;
              desc5: string;
              moreNews: string;
              title: string;
            };
            registerCount: string;
            rest: string;
            schedule: string;
            study: string;
            todo: string;
            turnover: string;
            visitCount: string;
            weatherDesc: string;
            work: string;
          };
          login: {
            bindWeChat: {
              title: string;
            };
            codeLogin: {
              getCode: string;
              imageCodePlaceholder: string;
              reGetCode: string;
              sendCodeSuccess: string;
              title: string;
            };
            common: {
              back: string;
              codeLogin: string;
              codePlaceholder: string;
              confirm: string;
              confirmPasswordPlaceholder: string;
              login: string;
              Register: string;
              loginSuccess: string;
              passwordPlaceholder: string;
              phonePlaceholder: string;
              userNamePlaceholder: string;
              validateSuccess: string;
              welcomeBack: string;
            };
            pwdLogin: {
              admin: string;
              forgetPassword: string;
              otherAccountLogin: string;
              otherLoginMode: string;
              register: string;
              rememberMe: string;
              superAdmin: string;
              title: string;
              user: string;
              login:string;
            };
            register: {
              agreement: string;
              policy: string;
              protocol: string;
              title: string;
              success: string;
            };
            resetPwd: {
              title: string;
              success: string;
              confirm: string;
            };
          };
          manage: {
            common: {
              status: {
                disable: string;
                enable: string;
              };
            };
            menu: {
              activeMenu: string;
              addChildMenu: string;
              addMenu: string;
              button: string;
              buttonCode: string;
              buttonDesc: string;
              constant: string;
              editMenu: string;
              fixedIndexInTab: string;
              form: {
                activeMenu: string;
                button: string;
                buttonCode: string;
                buttonDesc: string;
                fixedIndexInTab: string;
                fixedInTab: string;
                hideInMenu: string;
                home: string;
                href: string;
                i18nKey: string;
                icon: string;
                keepAlive: string;
                layout: string;
                localIcon: string;
                menuName: string;
                menuStatus: string;
                menuType: string;
                multiTab: string;
                order: string;
                page: string;
                parent: string;
                pathParam: string;
                queryKey: string;
                queryValue: string;
                routeName: string;
                routePath: string;
              };
              hideInMenu: string;
              home: string;
              href: string;
              i18nKey: string;
              icon: string;
              iconType: {
                iconify: string;
                local: string;
              };
              iconTypeTitle: string;
              id: string;
              keepAlive: string;
              layout: string;
              localIcon: string;
              menuName: string;
              menuStatus: string;
              menuType: string;
              multiTab: string;
              order: string;
              page: string;
              parent: string;
              parentId: string;
              pathParam: string;
              query: string;
              routeName: string;
              routePath: string;
              title: string;
              type: {
                directory: string;
                menu: string;
              };
            };
            role: {
              addRole: string;
              buttonAuth: string;
              editRole: string;
              form: {
                roleCode: string;
                roleDesc: string;
                roleName: string;
                roleStatus: string;
              };
              menuAuth: string;
              roleCode: string;
              roleDesc: string;
              roleName: string;
              roleStatus: string;
              title: string;
            };
            roleDetail: {
              content: string;
              explain: string;
            };
            user: {
              addUser: string;
              editUser: string;
              form: {
                nickName: string;
                userEmail: string;
                userGender: string;
                userName: string;
                userPhone: string;
                userRole: string;
                userStatus: string;
              };
              gender: {
                female: string;
                male: string;
              };
              nickName: string;
              title: string;
              userEmail: string;
              userGender: string;
              userName: string;
              userPhone: string;
              userRole: string;
              userStatus: string;
            };
            userDetail: {
              content: string;
              explain: string;
            };
          };
        };
        request: {
          logout: string;
          logoutMsg: string;
          logoutWithModal: string;
          logoutWithModalMsg: string;
          refreshToken: string;
          tokenExpired: string;
        };
        route: any,
        theme: {
          colourWeakness: string;
          configOperation: {
            copyConfig: string;
            copySuccessMsg: string;
            resetConfig: string;
            resetSuccessMsg: string;
          };
          fixedHeaderAndTab: string;
          footer: {
            fixed: string;
            height: string;
            right: string;
            visible: string;
          };
          grayscale: string;
          header: {
            breadcrumb: {
              showIcon: string;
              visible: string;
            };
            height: string;
          };
          isOnlyExpandCurrentParentMenu: string;
          layoutMode: { reverseHorizontalMix: string; title: string } & Record<UnionKey.ThemeLayoutMode, string>;
          page: {
            animate: string;
            mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
          };
          pageFunTitle: string;
          recommendColor: string;
          recommendColorDesc: string;
          scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
          sider: {
            collapsedWidth: string;
            inverted: string;
            mixChildMenuWidth: string;
            mixCollapsedWidth: string;
            mixWidth: string;
            width: string;
          };
          tab: {
            cache: string;
            height: string;
            mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
            visible: string;
          };
          themeColor: {
            followPrimary: string;
            title: string;
          } & Theme.ThemeColor;
          themeDrawerTitle: string;
          themeSchema: { title: string };
          watermark: {
            text: string;
            visible: string;
          };
        };
        datatable: {
          itemCount: string
        }
        dropdown: Record<Global.DropdownKey, string>;
        icon: {
          collapse: string;
          expand: string;
          fullscreen: string;
          fullscreenExit: string;
          lang: string;
          pin: string;
          reload: string;
          themeConfig: string;
          themeSchema: string;
          unpin: string;
        }
        system: {
          errorReason: string;
          reload: string;
          title: string;
          updateCancel: string;
          updateConfirm: string;
          updateContent: string;
          updateTitle: string;
        };
      }
    }
    type GetI18nKey<
      T extends Record<string, unknown>,
      K extends keyof T = keyof T,
    > = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never

    type I18nKey = GetI18nKey<Schema['translation']>

    type TranslateOptions<Locale extends string> = import('i18next').TOptions<Locale>

    interface $T {
      (key: I18nKey): string
      (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string
      (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string
      (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string
      (key: I18nKey, list: unknown[], plural: number): string
      (key: I18nKey, list: unknown[], defaultMsg: string): string
      (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string
      (key: I18nKey, named: Record<string, unknown>, plural: number): string
      (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string
    }
  }
}
