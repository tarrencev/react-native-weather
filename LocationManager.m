//
//  LocationManager.m
//  rndemo
//
//  Created by Tarrence van As on 5/28/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "RCTBridge.h"
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"
@import CoreLocation;

@interface LocationManager : NSObject <RCTBridgeModule>
@end

@implementation LocationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getLocationInfoFromCoords:(CLLocationDegrees) lat lon:(CLLocationDegrees)lon:(RCTResponseSenderBlock)callback)
{
  CLLocation *loc = [[CLLocation alloc] initWithLatitude:lat longitude:lon];
  CLGeocoder *reverseGeocoder = [[CLGeocoder alloc] init];
  [reverseGeocoder reverseGeocodeLocation:loc completionHandler:^(NSArray *placemarks, NSError *error)
   {
     if (error){
       return;
     }

     CLPlacemark *myPlacemark = [placemarks objectAtIndex:0];
     NSString *locality = myPlacemark.locality;
     NSString *region = myPlacemark.administrativeArea;

     callback(@[[NSNull null], @{
        @"locality": locality,
        @"region": region,
      }]);

   }];
}

@end
