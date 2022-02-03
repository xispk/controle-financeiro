import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import IconCoin from '../../components/IconCoin';
import {
  MdReport,
  MdReportProblem,
  MdCheckCircle,
  MdInfo,
} from 'react-icons/md';
import { useAuth } from '../../contexts/authContext';
import Spinner from '../../components/Spinner';

const Login = () => {
  const { accessToken } = useAuth();
  const [authResponse, setAuthResponse] = useState<{
    status: string;
    message: string;
  } | null>(null);
  const router = useRouter();
  const { t } = useTranslation('auth');

  interface ResponseIcons {
    success: ReactElement;
    failure: ReactElement;
    attention: ReactElement;
    info: ReactElement;
  }

  const responseIcons: ResponseIcons = {
    success: <MdCheckCircle className='form__response-icon--success' />,
    failure: <MdReport className='form__response-icon--failure' />,
    attention: <MdReportProblem className='form__response-icon--attention' />,
    info: <MdInfo className='form__response-icon--info' />,
  };

  const authSchema = object({
    email: string().nonempty({
      message: t('form.empty-email'),
    }),
    username: string().nonempty({
      message: t('form.empty-username'),
    }),
    password: string().nonempty({
      message: t('form.empty-password'),
    }),
  });

  type AuthSchemaInput = TypeOf<typeof authSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthSchemaInput>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (values: AuthSchemaInput) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        {
          headers: { 'Accept-Language': `${router.locale}` },
        }
      );

      setAuthResponse({ status: 'success', message: data.message });

      const { accessToken, refreshToken } = data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // redirect to the app homepage
      router.push('/app');
    } catch (error: any) {
      if (error.response) {
        setAuthResponse({
          status: 'failure',
          message: error.response.data.message,
        });
      } else if (error.request) {
        setAuthResponse({
          status: 'attention',
          message: t('form.no-response'),
        });
      } else {
        console.log('error setting up the request');
        setAuthResponse({
          status: 'attention',
          message: t('form.no-response'),
        });
      }
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAuthResponse(null);
    }, 7000);

    return () => clearTimeout(timeOut);
  }, [authResponse]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.push('/app');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>{t('login.page-title')}</title>
      </Head>
      <section className='login-section'>
        <div className='container'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            {authResponse && (
              <div
                className={`form__response form__response--${authResponse.status}`}
                onClick={() => setAuthResponse(null)}
              >
                {responseIcons[authResponse.status as keyof ResponseIcons]}
                <span>{authResponse.message}</span>
              </div>
            )}

            <div className='logo'>
              <IconCoin className='logo__icon' />
              <div className='logo__text'>
                <span className='logo__title'>Cifrão de Ouro</span>
                <span className='logo__subtitle'>Gestão Financeira</span>
              </div>
            </div>
            <h2 className='form__heading'>Login</h2>
            <div className='form__control'>
              <label className='form__label' htmlFor='email'>
                {t('form.email-label')}
              </label>
              <input
                className={
                  errors.email
                    ? 'form__input form__input--error'
                    : 'form__input'
                }
                type='text'
                id='email'
                autoComplete='off'
                placeholder={t('form.email-placeholder')}
                {...register('email')}
              />
              <span className='form__error'>{errors.email?.message}</span>
            </div>
            <div className='form__control'>
              <label className='form__label' htmlFor='username'>
                {t('form.username-label')}
              </label>
              <input
                className={
                  errors.username
                    ? 'form__input form__input--error'
                    : 'form__input'
                }
                type='text'
                id='username'
                autoComplete='off'
                placeholder={t('form.username-placeholder')}
                {...register('username')}
              />
              <span className='form__error'>{errors.username?.message}</span>
            </div>
            <div className='form__control'>
              <label className='form__label' htmlFor='password'>
                {t('form.password-label')}
              </label>
              <input
                className={
                  errors.password
                    ? 'form__input form__input--error'
                    : 'form__input'
                }
                type='password'
                id='password'
                autoComplete='off'
                placeholder={t('form.password-placeholder')}
                {...register('password')}
              />
              <span className='form__error'>{errors.password?.message}</span>
            </div>
            <button className='form__btn btn' type='submit'>
              {t('form.submit-login')}
            </button>
            <div className='form__links'>
              <Link href='#'>
                <a className='form__link'>{t('form.to-homepage')}</a>
              </Link>
              <Link href='#'>
                <a className='form__link'>{t('form.no-account')}</a>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth'])),
    },
  };
};
