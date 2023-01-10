import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @Input() cameraOpen!: boolean;
  @Output() closeCamera = new EventEmitter<boolean>();
  @Output() pictureTaken = new EventEmitter<WebcamImage>();
  width!: number;
  height!: number;
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
  }
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId!: string;
  videoOptions: MediaTrackConstraints = {
    width: { ideal: 1024 },
    height: { ideal: 576 },
  }
  errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  constructor() {
    this.onResize();
   }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    })
  }
  
  triggerSnapShot(): void {
    this.trigger.next();
  }

  toggleWebCam(): void {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webCamImage: WebcamImage): void {
    // console.info('image', webCamImage);
    this.pictureTaken.emit(webCamImage);
    this.cameraOpen = false;
    this.closeCamera.emit(false);
  }


  cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  click() {
    this.cameraOpen = false;
    this.closeCamera.emit(false);
  }
}
