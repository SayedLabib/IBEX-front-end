"use client";

import { useState } from "react";
import PageHero from "@/components/layout/PageHero";
import Icon from "@/components/ui/Icon";
import { contactHero } from "@/lib/data/content";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHero banner={contactHero} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-lg overflow-hidden border border-gray-200 h-96">
          <iframe
            title="Store location map"
            className="w-full h-full"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=90.3125%2C23.7300%2C90.5125%2C23.8900&layer=mapnik&marker=23.8103%2C90.4125"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-bold text-ink mb-5">Drop Us a Line</h2>
          {sent ? (
            <p className="text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-3 text-sm">
              Thanks for reaching out! We&apos;ll get back to you within 24 hours.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-600 mb-1">Enter Your Name</label>
                <input required className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Enter Email</label>
                <input required type="email" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea required rows={5} className="input-field" />
              </div>
              <button type="submit" className="btn-gold">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-6 h-fit space-y-5 text-sm">
          <div className="flex gap-3">
            <Icon name="map-pin" size={18} />
            <div>
              <p className="font-semibold text-ink">Address</p>
              <p className="text-gray-600">House 12, Road 5, Banani, Dhaka 1213, Bangladesh</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="phone" size={18} />
            <div>
              <p className="font-semibold text-ink">Phone</p>
              <p className="text-gray-600">Toll Free: 09612-345678</p>
              <p className="text-gray-600">Mobile: +880 1712-345678</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="mail" size={18} />
            <div>
              <p className="font-semibold text-ink">Email</p>
              <p className="text-gray-600">mail@example.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="clock" size={18} />
            <div>
              <p className="font-semibold text-ink">Working Days</p>
              <p className="text-gray-600">Mon - Fri / 9:30 AM - 6:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
