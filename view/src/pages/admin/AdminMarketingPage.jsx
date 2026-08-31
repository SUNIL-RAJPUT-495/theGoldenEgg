import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AdminMarketingTab } from '../../comonents/admin/AdminMarketingTab';

export const AdminMarketingPage = () => {
  const ctx = useOutletContext();

  return (
    <AdminMarketingTab
      couponsList={ctx.couponsList}
      bannersList={ctx.bannersList}
      showCouponModal={ctx.showCouponModal}
      setShowCouponModal={ctx.setShowCouponModal}
      couponForm={ctx.couponForm}
      setCouponForm={ctx.setCouponForm}
      handleCreateCoupon={ctx.handleCreateCoupon}
      handleDeleteCoupon={ctx.handleDeleteCoupon}
      showBannerModal={ctx.showBannerModal}
      setShowBannerModal={ctx.setShowBannerModal}
      bannerForm={ctx.bannerForm}
      setBannerForm={setBannerForm => ctx.setBannerForm(setBannerForm)}
      handleCreateBanner={ctx.handleCreateBanner}
      handleDeleteBanner={ctx.handleDeleteBanner}
    />
  );
};

export default AdminMarketingPage;
